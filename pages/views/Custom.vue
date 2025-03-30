<template>
  <div>
    <h1 class="text-4xl">
      {{ activeConfigName ? activeConfigName : 'Custom Roulette' }}
    </h1>
    <div class="py-10 relative">
      <Roulette
        v-if="wheelActive"
        ref="wheel"
        :items="items"
        :first-item-index="firstItemIndex"
        :centered-indicator="wheelSettings.centeredIndicator"
        :indicator-position="wheelSettings.indicatorPosition"
        :size="wheelSettings.size"
        :display-shadow="wheelSettings.displayShadow"
        :display-border="wheelSettings.displayBorder"
        :display-indicator="wheelSettings.displayIndicator"
        :duration="wheelSettings.duration"
        :result-variation="wheelSettings.resultVariation"
        :easing="wheelSettings.easing"
        :counter-clockwise="wheelSettings.counterClockwise"
        :horizontal-content="wheelSettings.horizontalContent"
        :base-display="wheelSettings.baseDisplay"
        :base-size="wheelSettings.baseSize"
        :base-display-indicator="wheelSettings.baseDisplayIndicator"
        :base-display-shadow="wheelSettings.baseDisplayShadow"
        :base-background="wheelSettings.baseBackground"
        @click="launchWheel"
        @wheel-start="wheelStartedCallback"
        @wheel-end="wheelEndedCallback"
      >
        <template #baseContent>
          <div
            v-if="wheelSettings.baseHtmlContent"
            v-html="wheelSettings.baseHtmlContent"
          />
        </template>
      </Roulette>
  
      <div 
        v-show="result"
        class="absolute bottom-2 left-1/2 transform -translate-x-1/2"
      >
        <button
          class="btn btn-xs mx-2"
          @click="onHardReset()"
        >
          Hard reset
        </button>
        <button
          class="btn btn-xs mx-2"
          @click="onSoftReset()"
        >
          Soft reset
        </button>
      </div>
    </div>
  
    <div class="flex justify-center space-x-4 mb-6">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Configuration Name</span>
        </label>
        <input 
          v-model="configName" 
          type="text" 
          placeholder="My Custom Wheel" 
          class="input input-bordered"
        >
      </div>
        
      <div class="flex items-end space-x-2">
        <button 
          class="btn btn-primary" 
          @click="saveConfiguration"
        >
          Save Configuration
        </button>
        <button 
          class="btn btn-secondary" 
          @click="shareConfiguration"
        >
          Share Configuration
        </button>
      </div>
    </div>
  
    <div
      v-if="savedConfigurations.length > 0"
      class="mb-6"
    >
      <h3 class="text-xl mb-2">
        Saved Configurations
      </h3>
      <div class="flex flex-wrap gap-2 justify-center">
        <div 
          v-for="config in savedConfigurations" 
          :key="config.id"
          class="flex items-center"
        >
          <button 
            class="btn btn-sm" 
            @click="loadConfiguration(config)"
          >
            {{ config.name }}
          </button>
          <button 
            class="btn btn-sm btn-error ml-1"
            @click="deleteConfiguration(config)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-4 h-4 stroke-current"
            >   
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />                       
            </svg>
          </button>
        </div>
      </div>
    </div>
  
    <div
      v-if="shareUrl"
      class="mb-6"
    >
      <h3 class="text-xl mb-2">
        Share URL
      </h3>
      <div class="flex items-center space-x-2">
        <input 
          ref="shareUrlInput"
          type="text" 
          readonly 
          :value="shareUrl" 
          class="input input-bordered flex-grow"
        >
        <button 
          class="btn btn-sm" 
          @click="copyShareUrl"
        >
          Copy
        </button>
      </div>
      <p
        v-if="copySuccess"
        class="text-green-500 mt-1"
      >
        URL copied to clipboard!
      </p>
    </div>
  
    <div class="tabs tabs-boxed justify-center">
      <a
        class="tab"
        :class="{'tab-active': managerId === 1 }"
        @click="managerId = 1"
      >Items manager</a> 
      <a
        class="tab"
        :class="{'tab-active': managerId === 2 }"
        @click="managerId = 2"
      >Wheel manager</a>
    </div>
  
    <div class="divider" /> 
  
    <ItemsManager
      v-if="managerId === 1"
      :key="itemsKey"
      class="item-manager overflow-scroll lg:overflow-auto"
      :initial-items="items"
      :initial-first-item-index="firstItemIndex"
      @update-items="onSoftReset"
    />
    <WheelManager
      v-if="managerId === 2"
      :key="wheelSettingsKey"
      :initial-settings="wheelSettings"
      @hard-reset="onHardReset"
    />
  </div>
</template>
  
  <script>
  import ItemsManager from "../components/ItemsManager.vue";
  import WheelManager from "../components/WheelManager.vue";
  import Roulette from "../../src/components/Roulette.vue";
  import wheelData from "../data/homeData";
  
  export default {
    name: "Custom",
  
    components: {
      Roulette,
      ItemsManager,
      WheelManager
    },
  
    data() {
      return {
        ...this.getInitialData(),
        wheelActive: true,
        startAnim: false,
        managerId: 1,
        result: null,
        configName: "",
        savedConfigurations: [],
        shareUrl: "",
        copySuccess: false,
        itemsKey: 0,
        wheelSettingsKey: 0,
        activeConfigName: null
      };
    },
  
    mounted() {
      // Charger les configurations sauvegardées
      this.loadSavedConfigurations();
  
      // Vérifier s'il y a une configuration dans l'URL
      this.checkUrlForConfiguration();
    },
  
    methods: {
      getInitialData() {
        // Récupérer les données depuis l'URL ou utiliser les données par défaut
        return wheelData;
      },
  
      launchWheel() {
        this.$refs.wheel.launchWheel();
      },
  
      wheelStartedCallback(resultItem) {
        console.log("wheel started !", resultItem);
      },
  
      wheelEndedCallback(resultItem) {
        console.log("wheel ended !", resultItem);
        this.result = resultItem;
      },
  
      onSoftReset(newItemList) {
        this.items = newItemList || this.items;
        this.$refs.wheel.reset();
      },
  
      onHardReset() {
        this.wheelActive = false;
        this.result = null;
        setTimeout(() => {
          this.wheelActive = true;
        }, 10);
      },
  
      saveConfiguration() {
        // Vérifier si le nom est vide
        if (!this.configName.trim()) {
          this.configName = `Custom Wheel ${new Date().toLocaleString()}`;
        }
  
        // Créer l'objet de configuration
        const config = {
          id: Date.now(),
          name: this.configName,
          data: {
            items: this.items,
            firstItemIndex: this.firstItemIndex,
            wheelSettings: this.wheelSettings
          }
        };
  
        // Récupérer les configurations existantes
        let configs = JSON.parse(localStorage.getItem('wheelConfigurations') || '[]');
        
        // Ajouter la nouvelle configuration
        configs.push(config);
        
        // Sauvegarder dans le localStorage
        localStorage.setItem('wheelConfigurations', JSON.stringify(configs));
        
        // Mettre à jour la liste des configurations sauvegardées
        this.savedConfigurations = configs;
        
        // Mettre à jour le nom de la configuration active
        this.activeConfigName = this.configName;
        
        // Réinitialiser le nom de la configuration
        this.configName = "";
      },
  
      loadSavedConfigurations() {
        // Charger les configurations depuis le localStorage
        const configs = JSON.parse(localStorage.getItem('wheelConfigurations') || '[]');
        this.savedConfigurations = configs;
      },
  
      loadConfiguration(config) {
        // Charger la configuration sélectionnée
        this.items = config.data.items;
        this.firstItemIndex = config.data.firstItemIndex;
        this.wheelSettings = config.data.wheelSettings;
        
        // Mettre à jour le nom de la configuration active
        this.activeConfigName = config.name;
        
        // Forcer la réinitialisation des composants
        this.itemsKey++;
        this.wheelSettingsKey++;
        
        // Réinitialiser la roue
        this.onHardReset();
      },
  
      deleteConfiguration(config) {
        // Récupérer les configurations existantes
        let configs = JSON.parse(localStorage.getItem('wheelConfigurations') || '[]');
        
        // Filtrer pour supprimer la configuration sélectionnée
        configs = configs.filter(c => c.id !== config.id);
        
        // Sauvegarder dans le localStorage
        localStorage.setItem('wheelConfigurations', JSON.stringify(configs));
        
        // Mettre à jour la liste des configurations sauvegardées
        this.savedConfigurations = configs;
        
        // Si la configuration active est supprimée, réinitialiser le nom
        if (this.activeConfigName === config.name) {
          this.activeConfigName = null;
        }
      },
  
      shareConfiguration() {
        // Créer un objet avec les données à partager
        const shareData = {
          items: this.items,
          firstItemIndex: this.firstItemIndex,
          wheelSettings: this.wheelSettings,
          name: this.activeConfigName || (this.configName ? this.configName : "Shared Configuration")
        };
        
        // Convertir en JSON et encoder en URI
        const jsonString = JSON.stringify(shareData);
        const encodedData = encodeURIComponent(jsonString);
        
        // Créer l'URL de partage
        const url = new URL(window.location.href);
        url.searchParams.set('config', encodedData);
        
        // Mettre à jour l'URL de partage
        this.shareUrl = url.toString();
      },
  
      copyShareUrl() {
        // Copier l'URL dans le presse-papier en utilisant l'API moderne
        navigator.clipboard.writeText(this.shareUrl)
          .then(() => {
            // Afficher un message de succès
            this.copySuccess = true;
            setTimeout(() => {
              this.copySuccess = false;
            }, 3000);
          })
          .catch(err => {
            console.error('Erreur lors de la copie dans le presse-papier: ', err);
          });
      },
  
      checkUrlForConfiguration() {
        // Vérifier si l'URL contient une configuration
        const urlParams = new URLSearchParams(window.location.search);
        const encodedConfig = urlParams.get('config');
        
        if (encodedConfig) {
          try {
            // Décoder la configuration
            const jsonString = decodeURIComponent(encodedConfig);
            const config = JSON.parse(jsonString);
            
            // Appliquer la configuration
            this.items = config.items;
            this.firstItemIndex = config.firstItemIndex;
            this.wheelSettings = config.wheelSettings;
            
            // Mettre à jour le nom de la configuration active si disponible
            this.activeConfigName = config.name || "Shared Configuration";
            
            // Forcer la réinitialisation des composants
            this.itemsKey++;
            this.wheelSettingsKey++;
            
            // Réinitialiser la roue
            this.onHardReset();
          } catch (error) {
            console.error('Failed to load configuration from URL', error);
          }
        }
      }
    }
  };
  </script>
  