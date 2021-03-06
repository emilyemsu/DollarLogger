import {
  GET_PAYMENTS_REQUEST,
  GET_PAYMENTS_SUCCESS,
  GET_PAYMENTS_FAILURE,
  FETCH_PAYMENTS_SUCCESS,
  FETCH_PAYMENTS_FAILURE,
  PUSH_PAYMENTS_FAILURE,
  GetPaymentsRequestAction,
  GetPaymentsSuccessAction,
  GetPaymentsFailureAction,
} from '~/app/actions/ActionTypes'
import * as PaymentModel from '~/app/store/models/payment'
import {
  Payment
} from '~/app/store/state/PaymentState'

export function getPaymentsRequest(): GetPaymentsRequestAction {
  return {
    type: GET_PAYMENTS_REQUEST
  }
}

export function getPaymentsSuccess(payments: Array<Payment>): GetPaymentsSuccessAction {
  return {
    type: GET_PAYMENTS_SUCCESS,
    payments,
  }
}

export function getPaymentsFailure(errorMessage: string): GetPaymentsFailureAction {
  return {
    type: GET_PAYMENTS_FAILURE,
    errorMessage,
  }
}

export function getPayments() {
  return function (dispatch) {
    dispatch(getPaymentsRequest())
    return PaymentModel.getPayments()
      .then(payments => dispatch(getPaymentsSuccess(payments)))
      .catch(error => dispatch(getPaymentsFailure(error.message)))
  }
}

export function createPayment(payment: Payment) {
  return function (dispatch) {
    dispatch(getPaymentsRequest())
    return PaymentModel.addPayment(payment)
      .then(payments => dispatch(getPaymentsSuccess(payments)))
      .catch(error => dispatch(getPaymentsFailure(error.message)))
  }
}

export function updatePayment(payment: Payment) {
  return function (dispatch) {
    dispatch(getPaymentsRequest())
    return PaymentModel.updatePayment(payment)
      .then(payments => dispatch(getPaymentsSuccess(payments)))
      .catch(error => dispatch(getPaymentsFailure(error.message)))
  }
}

export function deletePayment(paymentId: number) {
  return function (dispatch) {
    dispatch(getPaymentsRequest())
    return PaymentModel.deletePayment(paymentId)
      .then(payments => dispatch(getPaymentsSuccess(payments)))
      .catch(error => dispatch(getPaymentsFailure(error.message)))
  }
}

export function syncPayments() {
  return function (dispatch) {
    dispatch(getPaymentsRequest())
    return PaymentModel.syncPayments()
      .then(payments => dispatch(getPaymentsSuccess(payments)))
      .catch(error => dispatch(getPaymentsFailure(error.message)))
  }
}

export function clearLocalPayments() {
  return function (dispatch) {
    dispatch(getPaymentsRequest())
    return PaymentModel.clearLocalPayments()
      .then(payments => dispatch(getPaymentsSuccess(payments)))
      .catch(error => dispatch(getPaymentsFailure(error.message)))
  }
}

export function fetchPaymentsSuccess(): FetchPaymentsSuccessAction {
  return {
    type: FETCH_PAYMENTS_SUCCESS,
    fetchSuccessTimestamp: Date.now(),
  }
}

export function fetchPaymentsFailure(): FetchPaymentsFailureAction {
  return {
    type: FETCH_PAYMENTS_FAILURE,
    fetchFailureTimestamp: Date.now(),
  }
}

export function pushPaymentsFailure(): PushPaymentsFailureAction {
  return {
    type: PUSH_PAYMENTS_FAILURE,
    pushFailureTimestamp: Date.now(),
  }
}
