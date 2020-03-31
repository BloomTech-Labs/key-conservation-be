const Reports = require('../../models/reportModel');

module.exports = {
  // This is something I had to do due to the existing
  // unnecessary variation of primary key names
  assignIdTag: (table_name) => {
    switch (table_name) {
      case 'comments': {
        return 'comment_id';
      }
      case 'campaigns': {
        return 'campaign_id';
      }
      case 'campaign_updates': {
        return 'update_id';
      }
      default: {
        return 'id';
      }
    }
  },
  getSimilarReportCount: async (report) => {
    // How many times has this item been reported?
    const duplicates = await Reports.findWhere({
      reported_user: report.reported_user,
      post_id: report.post_id,
      table_name: report.table_name,
    });

    return duplicates.length;
  },
};
