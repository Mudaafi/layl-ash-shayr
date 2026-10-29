<script setup lang="ts">
import { ref } from 'vue'
import useEventbrite from '@/stores/eventbrite-store'
import router from '@/router'
import { toast } from 'vue-sonner'
import type { Attendee } from '../../../types'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import Input from '../ui/input/Input.vue'
import { Button } from '../ui/button'
import { PlusIcon } from '@lucide/vue'

const { insertWalkIn } = useEventbrite()
const isWalkInFormOpen = ref(false)
const isSelectDropdownOpen = ref(false)
function closeDialog() {
  if (isSelectDropdownOpen.value) {
    isSelectDropdownOpen.value = false
  } else {
    isWalkInFormOpen.value = false
  }
}
const walkIn = ref<Attendee>({ ticketType: 'General', basePrice: 5, quantity: 1 } as any)
async function registerWalkIn(e: SubmitEvent) {
  e.preventDefault()
  const { name, basePrice, ticketType } = walkIn.value

  if (!name || (!basePrice && basePrice !== 0) || !ticketType) {
    toast.error(`error: ${JSON.stringify(walkIn.value)}`)
    return
  }

  walkIn.value.attendeeId = 'walk-' + String(Math.floor(Math.random() * 1000000))
  walkIn.value.orderId = 'walk-' + String(Math.floor(Math.random() * 1000000))
  walkIn.value.eventId = router.currentRoute.value.params.eventId as string
  walkIn.value.checkedIn = true
  console.log('🚀 ~ registerWalkIn ~ walkIn:', walkIn)

  // Supabase
  await insertWalkIn(walkIn.value)
  walkIn.value = { ticketType: 'General', basePrice: 5, quantity: 1 } as any
  closeDialog()
}
</script>

<template>
  <AlertDialog v-model:open="isWalkInFormOpen">
    <AlertDialogTrigger as-child>
      <Button variant="success" class="" @click="() => {}"><PlusIcon /></Button>
    </AlertDialogTrigger>

    <AlertDialogContent @on-overlay-click="closeDialog">
      <AlertDialogHeader>
        <AlertDialogTitle class="text-center">Register Walk-in</AlertDialogTitle>
        <form @submit="registerWalkIn">
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel for="name-new">Name</FieldLabel>
                  <Input
                    v-model="walkIn.name"
                    id="name-new"
                    placeholder="Future Poet"
                    required
                    variant="outline"
                  />
                </Field>
                <!-- eventId parsed, attendeeId & orderId randomized -->
                <Field>
                  <FieldLabel for="basePrice-new">Amount Paid</FieldLabel>
                  <Input
                    id="basePrice-new"
                    placeholder="5.67"
                    :default-value="5"
                    required
                    type="currency"
                    v-model="walkIn.basePrice"
                    variant="outline"
                  />
                </Field>
                <Field>
                  <FieldLabel for="quantity-new">Quantity</FieldLabel>
                  <Input
                    id="quantity-new"
                    placeholder="1"
                    :default-value="1"
                    required
                    type="number"
                    v-model="walkIn.quantity"
                    variant="outline"
                  />
                </Field>
                <div class="flex flex-col">
                  <Field>
                    <FieldLabel for="ticketType-new">Ticket Type</FieldLabel>
                    <Select
                      default-value="General"
                      v-model="walkIn.ticketType"
                      required
                      @update:open="(e) => (e === true ? (isSelectDropdownOpen = true) : null)"
                      @update:model-value="() => (isSelectDropdownOpen = false)"
                    >
                      <SelectTrigger id="ticketType-new">
                        <SelectValue placeholder="General" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General"> General Admission </SelectItem>
                        <SelectItem value="Supporter"> LAS Supporter </SelectItem>
                        <SelectItem value="Open Miccer">Open Miccer</SelectItem>
                        <SelectItem value="Waitlist">Waitlist</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <Field orientation="horizontal" class="justify-end mt-4">
                  <Button variant="outline" type="button" @click="closeDialog()">Cancel</Button>
                  <Button variant="success">Submit</Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>
        </form>
      </AlertDialogHeader>
    </AlertDialogContent>
  </AlertDialog>
</template>

<style lang="scss" scoped></style>
