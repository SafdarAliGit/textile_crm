// Copyright (c) 2024, Techverntures and contributors
// For license information, please see license.txt

frappe.ui.form.on('Customer Inquiry Form', {
    refresh: function (frm) {
        frm.set_value("inquiry_id", frm.doc.name);
        sum_packing(frm);
    },

});


frappe.ui.form.on('Inquiry Items', {

    packing: function (frm) {

        sum_packing(frm);
    },
    qty: function (frm) {
        sum_qty(frm);
    }
});

function sum_packing(frm) {
    var sum_packing = 0;
    $.each(frm.doc.inquiry_items || [], function (i, d) {
        sum_packing += flt(d.packing);
    });
    frm.set_value("total_packing", sum_packing);
}

function sum_qty(frm) {
    var sum_qty = 0;
    $.each(frm.doc.inquiry_items || [], function (i, d) {
        sum_qty += flt(d.qty);
    });
    frm.set_value("total_qty", sum_qty);
}

frappe.ui.form.on('Packing And Destination Detail', {

    carton_required: function (frm) {

        sum_carton_required(frm);
    },
    sticker_required: function (frm) {
        sum_sticker_required(frm);
    },
    packing_and_destination_detail_add:function (frm,cdt,cdn){
        frappe.model.set_value(cdt,cdn,"pcs_per_ctn",frm.doc.total_pcs || 0);
    },
    qty: function (frm,cdt,cdn) {
         var d = locals[cdt][cdn];
         frappe.model.set_value(cdt,cdn,"carton_required", (flt(d.qty) / flt(d.pcs_per_ctn)).toFixed(0) || 0);
           sum_carton_required(frm);
    }
});

function sum_carton_required(frm) {
    var sum_carton_required = 0;
    $.each(frm.doc.packing_and_destination_detail || [], function (i, d) {
        sum_carton_required += flt(d.carton_required);
    });
    frm.set_value("total_carton", sum_carton_required);
}

function sum_sticker_required(frm) {
    var sum_sticker_required = 0;
    $.each(frm.doc.packing_and_destination_detail || [], function (i, d) {
        sum_sticker_required += flt(d.sticker_required);
    });
    frm.set_value("total_sticker", sum_sticker_required);
}