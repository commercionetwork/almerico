<template>
  <MsgTx :title="title">
    <div slot="body">
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'context'"
            />
            {{ context }}
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span class="pr-3 text-capitalize font-weight-bold" v-text="'id'" />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
                params: { id: id },
              }"
              v-text="id"
            />
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'keys'"
          />
          <v-list-item v-for="(pubKey, index) in publicKeys" :key="index">
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'id'"
                />
                {{ pubKey.id }}
              </div>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'type'"
                />
                {{ pubKey.type }}
              </div>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'controller'"
                />
                {{ pubKey.controller }}
              </div>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'public key pem'"
                />
                <span class="text-break" v-text="pubKey.publicKeyPem" />
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'proof'"
          />
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'type'"
                />
                {{ proofType }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'created'"
                />
                {{ proofCreated }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'proof purpose'"
                />
                {{ proofPurpose }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'controller'"
                />
                {{ proofController }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'verification method'"
                />
                {{ proofVerificationMethod }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'signature value'"
                />
                {{ proofSignatureValue }}
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'service'"
          />
          <v-list-item v-for="(service, index) in services" :key="index">
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'id'"
                />
                {{ service.id }}
              </div>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'type'"
                />
                {{ service.type }}
              </div>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'service endpoint'"
                />
                {{ service.serviceEndpoint }}
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from '@/components/MsgTx.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgSetIdentity',
  description: 'Display a set identity transaction message',
  components: {
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a set identity message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    context() {
      return this.message.value['@context'] || '-';
    },
    id() {
      return this.message.value.id || '-';
    },
    proofController() {
      return this.message.value.proof.controller || '-';
    },
    proofCreated() {
      return this.message.value.proof && this.message.value.proof.created
        ? new Date(this.message.value.proof.created).toLocaleString()
        : '-';
    },
    proofPurpose() {
      return this.message.value.proof.proofPurpose || '-';
    },
    proofType() {
      return this.message.value.proof.type || '-';
    },
    proofVerificationMethod() {
      return this.message.value.proof.verificationMethod || '-';
    },
    proofSignatureValue() {
      return this.message.value.proof.signatureValue || '-';
    },
    publicKeys() {
      return this.message.value.publicKey ? this.message.value.publicKey : [];
    },
    services() {
      return this.message.value.service ? this.message.value.service : [];
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
  },
};
</script>
