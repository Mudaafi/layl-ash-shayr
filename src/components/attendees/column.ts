// components/payments/columns.ts
import { h } from 'vue'
import { createColumnHelper, filterFn_equals } from '@tanstack/vue-table'
import type { DataTableFeatures } from './features'
import type { Attendee } from '../../../types'
import SortableHeader from './SortableHeader.vue'
import AttendeeCheckbox from './AttendeeCheckbox.vue'
import AttendeeCheckboxHeader from './AttendeeCheckboxHeader.vue'

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Attendee>()

export const columns = columnHelper.columns([
  columnHelper.accessor('checkedIn', {
    id: 'checkedIn',
    header: ({ column }) => h(AttendeeCheckboxHeader, { column }),
    cell: ({ row }) =>
      h(AttendeeCheckbox, {
        attendeeId: row.original.attendeeId,
        checkedIn: row.original.checkedIn
      }),
    filterFn: filterFn_equals
  }),

  columnHelper.accessor('orderId', {
    header: ({ column }) => h(SortableHeader, { name: 'Order Id', column })
  }),
  columnHelper.accessor('name', {
    header: ({ column }) => h(SortableHeader, { name: 'Name', column }),
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('name'))
  }),
  columnHelper.accessor('ticketType', {
    header: ({ column }) => h(SortableHeader, { name: 'Ticket Type', column }),
    sortFn: (rowA, rowB) => {
      const ticketPriority: Array<Attendee['ticketType']> = [
        'General',
        'Supporter',
        'Waitlist',
        'Open Miccer'
      ]
      const areRowsEqual =
        ticketPriority.indexOf(rowA.original.ticketType) ===
        ticketPriority.indexOf(rowB.original.ticketType)
      const isRowAGreater =
        ticketPriority.indexOf(rowA.original.ticketType) >
        ticketPriority.indexOf(rowB.original.ticketType)

      return areRowsEqual ? 0 : isRowAGreater ? -1 : 1
    }
  }),
  columnHelper.accessor('quantity', {
    header: ({ column }) => h(SortableHeader, { name: 'Quantity', column }),
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('quantity'))
  }),
  columnHelper.accessor('basePrice', {
    header: ({ column }) => h(SortableHeader, { name: 'Amount Paid', column }),
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue('basePrice'))

      // Format the amount as a dollar amount
      const formatted =
        price > 0
          ? new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'SGD'
            }).format(price)
          : 'NA'

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  })
])
