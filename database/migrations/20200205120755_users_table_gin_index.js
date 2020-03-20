const addUserIndex = `
ALTER TABLE public.users
	ADD COLUMN IF NOT EXISTS full_text_weighted tsvector;
UPDATE public.users
SET full_text_weighted = setweight(to_tsvector(email), 'A'); 
CREATE INDEX IF NOT EXISTS full_text_weighted_index
	ON public.users
    USING GIN (full_text_weighted);
    
CREATE OR REPLACE FUNCTION user_tsvector_trigger() RETURNS trigger AS $$
begin
    new.full_text_weighted :=     
    setweight(to_tsvector('english', coalesce(new.email, '')), 'A');
    return new;
end
$$ LANGUAGE plpgsql;
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'tsvectorupdate') THEN
        CREATE TRIGGER tsvectorupdate  
        BEFORE INSERT OR UPDATE ON public.users
        FOR EACH ROW EXECUTE PROCEDURE user_tsvector_trigger();
    END IF;
END
$$;
`;

const removeUserIndex = `
DROP FUNCTION IF EXISTS user_tsvector_trigger() CASCADE;
DROP INDEX IF EXISTS full_text_weighted_index;
`;

exports.up = async function (knex, Promise) {
  const hasTable = await knex.schema.hasTable('users');
  if (!hasTable) return;

  return knex.schema.raw(addUserIndex);
};

exports.down = async function (knex, Promise) {
  const hasColumn = await knex.schema.hasColumn('users', 'full_text_weighted');
  await knex.schema.table('users', async (tbl) => {
    if (hasColumn) {
      tbl.dropColumn('full_text_weighted');
    }
  });
  return knex.schema.raw(removeUserIndex);
};
