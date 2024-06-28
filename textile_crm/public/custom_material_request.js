frappe.ui.form.on('Material Request', {
    refresh: function (frm) {
        frm.set_query('dyeing_work_order', function () {
              return {
                filters: [
                    ["Work Order", "docstatus", "=", "1"]
                ]
            };
        });
    }
});
