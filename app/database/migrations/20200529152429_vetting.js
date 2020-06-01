exports.up = function (knex) {
  return knex.schema.createTable("vetting", (tbl) => {
    tbl.increments("id");
    tbl.string("sub").notNullable().unique();
    tbl.string("email", 100).notNullable();
    tbl
      .string("profile_image", 500)
      .defaultTo(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
    tbl.timestamp("created_at").defaultTo(knex.fn.now());
    tbl.string("location", 250);
    tbl.string("city", 250);
    tbl.string("country", 250);
    tbl.string("mini_bio", 280);
    tbl.text("species_and_habitats", 1000);
    tbl.string("twitter", 150);
    tbl.string("facebook", 150);
    tbl.string("instagram", 150);
    tbl.string("phone_number", 50);
    tbl.string("roles", 50).notNullable();
    tbl.string("name", 50);
    tbl.string("link_url", 500);
    tbl.string("link_text", 50);
    tbl.string("call_to_action", 500);
    tbl.text("about_us", 1000);
    tbl.text("issues", 1000);
    tbl.text("support_us", 1000);
    tbl.double("longitude", 10);
    tbl.double("latitude", 10);
  });
};

exports.down = function (knex) {};
