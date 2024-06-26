frappe.ui.form.on("Purchase Order", {
    refresh: function (frm) {
        // Add any logic you want to execute when the form is refreshed
    },
})

frappe.ui.form.on("Purchase Order Item", {
    item_code: function (frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        if (row.item_code && frm.doc.item_group_name == "yarn") {

            frappe.call({
                method: 'textile_crm.textile_crm.utils.get_items_info',
                args: {
                    item_code: row.item_code
                },
                callback: function (response) {
                    if (response) {
                        frappe.model.set_value(row.doctype, row.name, 'brand_name', response.message.item[0].brand_name);
                        frappe.model.set_value(row.doctype, row.name, 'yarn_count', response.message.item[0].yarn_count);
                        frappe.model.set_value(row.doctype, row.name, 'yarn_quality', response.message.item[0].yarn_quality);
                        frappe.model.set_value(row.doctype, row.name, 'color', response.message.item[0].color);
                        frappe.model.set_value(row.doctype, row.name, 'yarn_gsm', response.message.item[0].yarn_gsm);
                    }
                }
            });
        }
    }
})
