/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  html,
  LitElement,
  customElement,
  internalProperty,
  property
} from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import styles from "./Summary.scss";
import { data } from "../customer-data/mock-customer";
@customElement("customer-summary")
export default class CustomerSummary extends LitElement {
  @property({ type: Object, attribute: false }) customerData?:
    | typeof data
    | undefined; // nice to define the interface when solidified

  static get styles() {
    return styles;
  }

  connectedCallback() {
    super.connectedCallback();
    console.log(this.customerData);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  // fetchCustomerDate = async (queryValue) => {
  //   return customerData
  // }

  // formatPhoneNumber() {
  //   if (true) {
  //     return formattedNumber
  //   } else return errorMessage
  // }

  render() {
    return html`
      <div class="summary-container" part="summary">
        <section class="cust-info-header">
          <md-avatar src=${ifDefined(
            this.customerData?.picture
          )} size="56"></md-avatar>
          <h1>${this.customerData?.name}</h1>
          <div class="age-gender">
            ${this.customerData?.age} years old, ${this.customerData?.gender}
          </div>
          <div class="phone">${this.customerData?.phone}</div>
        </section>

        <md-badge small color="green" pill="false"
          >MRN# ${this.customerData?.MRN}</md-badge
        >
        <table>
          <tr>
            <td>
              <span class="label">Date of Birth</span class="label">
            </td>
            <td>
              ${this.customerData?.DOB}
            </td>
          </tr>
          <tr>
            <td>
              <span class="label">Address</span class="label">
            </td>
            <td>
              ${this.customerData?.address}
            </td>
          </tr>
          <tr>
            <td>
              <span class="label">Insurance</span class="label">
            </td>
            <td>
              <span>${this.customerData?.insurance.provider}</span>
              <span>${this.customerData?.insurance.planName}</span>
              <span>${this.customerData?.insurance.planNumber}</span>
              <span>${this.customerData?.insurance.groupNumber}</span>
              <span>${this.customerData?.insurance.memberID}</span>
            </td>
          </tr>
          
        </table>
      </div>
    `;
  }
}