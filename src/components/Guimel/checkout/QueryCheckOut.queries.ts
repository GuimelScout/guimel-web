import gql from "graphql-tag";

export const MAKE_PAYMENT = gql`
  mutation MakePayment($activityIds: [String!]!, $startDate: CalendarDay!, $endDate: CalendarDay!, $guestsCount: String!, $nameCard: String!, $email: String!, $notes: String!, $lodgingId: String, $locationId: String, $paymentMethodId: String!, $total: String!, $noDuplicatePaymentMethod: Boolean!, $paymentType: String!) {
    makePayment(activityIds: $activityIds, startDate: $startDate, endDate: $endDate, guestsCount: $guestsCount, nameCard: $nameCard, email: $email, notes: $notes, lodgingId: $lodgingId, locationId: $locationId, paymentMethodId: $paymentMethodId, total: $total, noDuplicatePaymentMethod: $noDuplicatePaymentMethod, paymentType: $paymentType) {
      message
      success
      data
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      id
      stripeCustomerId
    }
  }
`;

export const GET_USER = gql`
  query User($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      email
      stripeCustomerId
    }
  }
`;

export const CREATE_PAYMENT_METHOD = gql`
  mutation CreatePaymentMethod($data: PaymentMethodCreateInput!) {
    createPaymentMethod(data: $data) {
      id
    }
  }
`;

export const GET_PAYMENT_METHOD = gql`
  query PaymentMethod($where: PaymentMethodWhereUniqueInput!) {
  paymentMethod(where: $where) {
    id
  }
}
`;

export const GET_SETUP_INTENT = gql`
  query SetUpIntentStripe($email: String!) {
    SetUpIntentStripe(email: $email) {
      data {
        customerId
        email
        ephemeralKey
        setupIntent
      }
      message
      success
    }
  }
`;

export const GET_STRIPE_PAYMENT_METHODS = gql`
  query StripePaymentMethods($email: String!) {
    StripePaymentMethods(email: $email) {
      message
      success
      data {
        data {
          id
          livemode
          type
          card {
            brand
            country
            exp_month
            exp_year
            last4
          }
        }
      }
    }
  }
`;