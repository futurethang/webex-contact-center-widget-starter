/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { agentxJsApi } from "@agentx/agentx-js-api";
import { html, LitElement, customElement, internalProperty } from "lit-element";
import styles from "./App.scss";
import { logger } from "./sdk";
import { Notifications } from '@uuip/unified-ui-platform-sdk';

@customElement("my-custom-component")
export default class MyCustomComponent extends LitElement {
  @internalProperty() notificationsAdded = 0;
  @internalProperty() notificationsPending = 0;
  @internalProperty() notificationsActivated = 0;
  @internalProperty() notificationsDeactivated = 0;

  static get styles() {
    return styles;
  }
  connectedCallback() {
    super.connectedCallback();
    this.init();
    this.subscribeNotificationsEvents();
  }

  async init() {
    await agentxJsApi.config.init();
  }

  subscribeNotificationsEvents() {
    agentxJsApi.notifications.addEventListener("add", n => {
      logger.info("Notifications Added: ", n);
      this.notificationsAdded = agentxJsApi.notifications.added.length;
    });
    agentxJsApi.notifications.addEventListener("pending", n => {
      logger.info("Notifications Pending: ", n);
      this.notificationsAdded = agentxJsApi.notifications.added.length;
      this.notificationsPending = agentxJsApi.notifications.pended.length;
      this.notificationsActivated = agentxJsApi.notifications.activated.length;
      this.notificationsDeactivated = agentxJsApi.notifications.deactivated.length;
    });
    agentxJsApi.notifications.addEventListener("activate", n => {
      logger.info("Notifications Activated: ", n);
      this.notificationsAdded = agentxJsApi.notifications.added.length;
      this.notificationsPending = agentxJsApi.notifications.pended.length;
      this.notificationsActivated = agentxJsApi.notifications.activated.length;
      this.notificationsDeactivated = agentxJsApi.notifications.deactivated.length;
    });
    agentxJsApi.notifications.addEventListener("deactivate", n => {
      logger.info("Notifications Deactivated: ", n);
      this.notificationsAdded = agentxJsApi.notifications.added.length;
      this.notificationsPending = agentxJsApi.notifications.pended.length;
      this.notificationsActivated = agentxJsApi.notifications.activated.length;
      this.notificationsDeactivated = agentxJsApi.notifications.deactivated.length;
    });
  }

  async changeState (s: "Available" | "Idle") {
    const agentState = await agentxJsApi.agentStateInfo.stateChange({
      state: s,
      auxCodeIdArray: "0",
    });
    logger.info("State Changed", agentState);
  }

  async getAgentAddressBooks() {
    const books = await agentxJsApi.agentStateInfo.fetchAddressBooks();
    logger.info("Address books: ", books);
  }

  async getAgentInfo() {
    const latestData = agentxJsApi.agentStateInfo.latestData;
    logger.info("AgentStateInfo latestData: ", latestData);
  }

  getClientLocale() {
    logger.info("Client locale: ", agentxJsApi.config.clientLocale);
  }

  emitNotification() {
    const raw = {
        data: {
            type: Notifications.ItemMeta.Type.Default,
            mode: Notifications.ItemMeta.Mode.AutoDismiss,
            title: "Info - AutoDismiss",
            data: "Lorem Ipsum Dolor"
        }
    };
 
    agentxJsApi.notifications.add(raw);
  }

  render() {
    return html`
      <div class="container">
        <h1>Custom Component Contents</h1>
        <md-tabs>
          <md-tab slot="tab">Request Data</md-tab>
          <md-tab-panel slot="panel">
            <div class="action-container">
              <h2>Monitor data output in console log</h2>
              <md-button
                @button-click=${() => this.getAgentInfo()}
                >Get latest Agent info</md-button
              >
              <md-button
                @button-click=${() => this.getClientLocale()}
                >Get current Locale</md-button
              >
              <md-button
                @button-click=${() => this.changeState("Idle")}
                >Change State to Idle</md-button
              >
              <md-button
                @button-click=${() => this.changeState("Available")}
                >Change State to Available</md-button
              >
              <md-button
                @button-click=${() => this.getAgentAddressBooks()}
                >Fetch Address Books</md-button
              >
            </div>
          </md-tab-panel>

          <md-tab slot="tab">Notifications</md-tab>
          <md-tab-panel slot="panel">
          <div class="action-container">
              <h2>Notifications</h2>
              <md-button
                @button-click=${() => this.emitNotification()}
                >Emit Notification</md-button
              >
              <md-label>Notifications Added: <span>${this.notificationsAdded}</span></md-label>
              <md-label>Notifications Pending: <span>${this.notificationsPending}</span></md-label>
              <md-label>Notifications Activated: <span>${this.notificationsActivated}</span></md-label>
              <md-label>Notifications Deactivated: <span>${this.notificationsDeactivated}</span></md-label>
              </div>
          </md-tab-panel>

          <md-tab slot="tab">Two</md-tab>
          <md-tab-panel slot="panel">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              ultricies lorem sem, id placerat massa rutrum eu. Sed dui neque,
              tincidunt quis sapien in, aliquam dignissim nulla. Vestibulum
              mollis at orci ac facilisis. Sed ut aliquam nunc. Suspendisse eu
              interdum odio. Sed libero dui, malesuada ac vulputate id,
              vulputate vel nisi. Proin id egestas mi. Fusce ut sem nibh.
              Vivamus aliquet accumsan feugiat. Etiam accumsan tortor quis
              ultrices tempus. Aenean porta feugiat ex. Praesent dictum mauris
              et dui posuere aliquet et non arcu. Sed eget aliquam elit. Nullam
              ornare ipsum quis feugiat tincidunt. Nullam a libero sed enim
              dictum convallis. Suspendisse egestas elit risus, at ultrices
              massa blandit eget. Vivamus dapibus bibendum nisl, eget cursus
              risus ultrices et. Quisque felis tortor, accumsan vel tempus quis,
              rutrum sed urna. Nulla quis magna et eros facilisis blandit. Nunc
              mattis urna eget diam accumsan, non vehicula est aliquet. Etiam
              vestibulum dui neque, faucibus sollicitudin nibh vestibulum vel.
              Nullam semper porta ipsum non varius. Vestibulum sollicitudin
              ipsum mauris. Praesent quis nisi sagittis, malesuada lacus semper,
              iaculis elit. Maecenas hendrerit quam ut felis pretium volutpat.
              Nulla molestie et tellus ac tincidunt. Sed sodales ultrices
              condimentum. Fusce quis rutrum dui, ut consectetur ante. Morbi
              quis sem in ipsum tempor mollis. Curabitur ac risus sed quam
              consequat faucibus quis nec neque. Nullam porttitor felis ut felis
              cursus dignissim. Curabitur tincidunt tortor et pharetra
              malesuada. Phasellus tempor ullamcorper scelerisque. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Nulla porttitor ex
              vel egestas tristique. Aenean molestie cursus tortor at cursus.
              Sed interdum volutpat leo, sit amet placerat velit congue eu.
              Vestibulum vitae consequat ex. Ut nec venenatis augue, in porta
              massa. Curabitur quis porta felis, vel eleifend nisl. Nulla
              facilisi. Integer sagittis felis nec lacinia rutrum. Etiam a
              mauris eu nulla pulvinar auctor nec sit amet ex. Quisque turpis
              ipsum, lacinia in ex ut, tempor tempus est. Vivamus a rutrum
              velit. Donec eleifend fermentum sollicitudin. Quisque condimentum
              mauris convallis viverra tempus. Ut enim quam, pulvinar et metus
              interdum, sagittis ultricies dui. Aenean consectetur at risus eget
              ornare. Mauris pretium consequat metus a vestibulum. Nulla sit
              amet nisl eleifend, faucibus turpis at, mattis tellus. Aliquam
              vehicula orci ac nisi elementum, vitae sollicitudin odio ultrices.
              Proin in laoreet mi, vitae condimentum nibh. Nunc quis dictum
              urna, at imperdiet augue. Donec congue tempus elit quis rhoncus.
              Etiam orci quam, vestibulum egestas rutrum non, dapibus a justo.
            </p>
          </md-tab-panel>

          
        </md-tabs>
        <slot></slot>
      </div>
    `;
  }
}
