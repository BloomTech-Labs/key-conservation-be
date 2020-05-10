const Reports = require('../../database/models/reportModel');

module.exports = {
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
