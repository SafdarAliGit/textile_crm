frappe.ui.form.on("Purchase Order", {
    refresh: function (frm) {

        frm.set_query('item_code', 'items', function (doc, cdt, cdn) {
            var d = locals[cdt][cdn];
            return {
                filters: [
                    ["Item", "item_group", "=", frm.doc.item_group_name]
                ]
            };
        });
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
                        if (frm.doc.item_group_name == 'yarn') {
                            frm.fields_dict['items'].grid.get_field('brand_name').df.hidden = 0;
                            frm.refresh_field("items"); // Refresh the child table to reflect changes
                        }


                    }
                }
            });
        }
    }
})
