import frappe


@frappe.whitelist()
def get_items_info(**args):
    item_code = args.get('item_code')
    item = frappe.qb.DocType("Item")
    parent_query = (
        frappe.qb.from_(item)
        .select(
            item.brand_name,
            item.yarn_count,
            item.yarn_quality,
            item.color,
            item.yarn_gsm

        ).where((item.item_code == item_code))
    )
    item = parent_query.run(as_dict=True)

    return {
        "item": item,
    }
