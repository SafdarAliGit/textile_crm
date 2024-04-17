// Copyright (c) 2024, Techverntures and contributors
// For license information, please see license.txt

frappe.ui.form.on('Customer Inquiry Form', {
    refresh: function (frm) {
        frm.set_value("inquiry_id", frm.doc.name);
    }
});
