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
        :revolutions="wheelSettings.revolutions"
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

  // Fonctions utilitaires pour compresser/décompresser les données
  const compressData = (data) => {
    // Optimiser la structure JSON en supprimant les clés redondantes
    const optimizedData = optimizeConfigData(data);
    
    // Convertir en chaîne JSON
    const jsonString = JSON.stringify(optimizedData);
    
    // Utiliser une compression avancée de type JWT
    return btoa64(jsonString);
  };

  const decompressData = (compressed) => {
    try {
      // Décoder avec notre encodage de type JWT
      const jsonString = atob64(compressed);
      
      // Convertir en objet
      const data = JSON.parse(jsonString);
      
      // Restaurer la structure complète
      return restoreConfigData(data);
    } catch (error) {
      console.error('Failed to decompress data', error);
      return null;
    }
  };
  
  // Implémentation d'encodage/décodage Base64 URL-safe (similaire à JWT)
  const btoa64 = (str) => {
    // Convertir la chaîne en UTF-8 puis en Base64
    const utf8Bytes = new TextEncoder().encode(str);
    const binaryString = Array.from(utf8Bytes)
      .map(byte => String.fromCharCode(byte))
      .join('');
    
    // Utiliser notre implémentation personnalisée de btoa
    let base64;
    if (typeof btoa === 'undefined') {
      // Utiliser notre implémentation personnalisée
      base64 = window.btoa(binaryString);
    } else {
      // Utiliser l'implémentation personnalisée directement
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      let output = '';
      for (
        let block = 0, charCode, i = 0, map = chars;
        binaryString.charAt(i | 0) || (map = '=', i % 1);
        output += map.charAt(63 & block >> 8 - i % 1 * 8)
      ) {
        charCode = binaryString.charCodeAt(i += 3/4);
        block = block << 8 | charCode;
      }
      base64 = output;
    }
    
    // Rendre le Base64 URL-safe (comme JWT)
    return base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };
  
  const atob64 = (str) => {
    // Restaurer le padding Base64 standard si nécessaire
    let base64 = str;
    if (base64.length % 4 !== 0) {
      base64 += '='.repeat(4 - (base64.length % 4));
    }
    
    // Restaurer les caractères Base64 standard
    base64 = base64
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    // Utiliser notre implémentation personnalisée de atob
    let binaryString;
    if (typeof atob === 'undefined') {
      // Utiliser notre implémentation personnalisée
      binaryString = window.atob(base64);
    } else {
      // Utiliser l'implémentation personnalisée directement
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      base64 = String(base64).replace(/=+$/, '');
      let output = '';
      
      let bc = 0, bs = 0, buffer, i = 0;
      while (i < base64.length) {
        buffer = base64.charAt(i++);
        buffer = chars.indexOf(buffer);
        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
          bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0;
      }
      binaryString = output;
    }
    
    // Convertir le binaire UTF-8 en chaîne de caractères
    try {
      // Méthode moderne pour décoder UTF-8
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return new TextDecoder().decode(bytes);
    } catch (e) {
      // Fallback pour les navigateurs plus anciens
      let result = '';
      const len = binaryString.length;
      let i = 0;
      while (i < len) {
        const c = binaryString.charCodeAt(i++);
        if (c <= 0x7F) {
          result += String.fromCharCode(c);
        } else if (c <= 0xDF && i < len) {
          const c2 = binaryString.charCodeAt(i++);
          result += String.fromCharCode(((c & 0x1F) << 6) | (c2 & 0x3F));
        } else if (c <= 0xEF && i + 1 < len) {
          const c2 = binaryString.charCodeAt(i++);
          const c3 = binaryString.charCodeAt(i++);
          result += String.fromCharCode(((c & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F));
        } else if (c <= 0xF7 && i + 2 < len) {
          const c2 = binaryString.charCodeAt(i++);
          const c3 = binaryString.charCodeAt(i++);
          const c4 = binaryString.charCodeAt(i++);
          const codepoint = ((c & 0x07) << 18) | ((c2 & 0x3F) << 12) | ((c3 & 0x3F) << 6) | (c4 & 0x3F);
          if (codepoint <= 0xFFFF) {
            result += String.fromCharCode(codepoint);
          } else {
            const highSurrogate = ((codepoint - 0x10000) >> 10) + 0xD800;
            const lowSurrogate = ((codepoint - 0x10000) & 0x3FF) + 0xDC00;
            result += String.fromCharCode(highSurrogate, lowSurrogate);
          }
        }
      }
      return result;
    }
  };
  
  // Fonction de secours pour les navigateurs qui ne supportent pas btoa/atob
  if (typeof btoa === 'undefined' || typeof atob === 'undefined') {
    // Implémentation personnalisée de btoa
    window.btoa = function(str) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      let output = '';
      for (
        let block = 0, charCode, i = 0, map = chars;
        str.charAt(i | 0) || (map = '=', i % 1);
        output += map.charAt(63 & block >> 8 - i % 1 * 8)
      ) {
        charCode = str.charCodeAt(i += 3/4);
        block = block << 8 | charCode;
      }
      return output;
    };
    
    // Implémentation personnalisée de atob
    window.atob = function(str) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      str = String(str).replace(/=+$/, '');
      let output = '';
      
      let bc = 0, bs = 0, buffer, i = 0;
      while (i < str.length) {
        buffer = str.charAt(i++);
        buffer = chars.indexOf(buffer);
        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
          bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0;
      }
      
      return output;
    };
  }

  // Optimiser la structure des données pour réduire la taille
  const optimizeConfigData = (config) => {
    // Créer une version optimisée avec des noms de propriétés courts
    const optimized = {
      i: [], // items
      f: config.firstItemIndex, // firstItemIndex
      s: {}, // settings
      n: config.name // name
    };

    // Optimiser les items en ne conservant que les valeurs non vides
    config.items.forEach(item => {
      const optimizedItem = {
        i: item.id,
        n: item.name
      };
      
      // N'ajouter les propriétés que si elles ont une valeur
      if (item.htmlContent) optimizedItem.h = item.htmlContent;
      if (item.textColor) optimizedItem.t = item.textColor;
      if (item.background) optimizedItem.b = item.background;
      
      optimized.i.push(optimizedItem);
    });

    // Optimiser les paramètres en ne conservant que ceux qui diffèrent des valeurs par défaut
    const settings = config.wheelSettings;
    const defaultSettings = {
      centeredIndicator: false,
      indicatorPosition: "top",
      size: 300,
      displayShadow: false,
      displayBorder: false,
      displayIndicator: true,
      duration: 4,
      revolutions: 3,
      resultVariation: 0,
      easing: "ease",
      counterClockwise: false,
      horizontalContent: false,
      baseDisplay: false,
      baseSize: 100,
      baseDisplayShadow: false,
      baseDisplayIndicator: false,
      baseBackground: "",
      baseHtmlContent: ""
    };
    
    // Ne conserver que les paramètres qui diffèrent des valeurs par défaut
    const s = {};
    if (settings.centeredIndicator !== defaultSettings.centeredIndicator) s.c = settings.centeredIndicator;
    if (settings.indicatorPosition !== defaultSettings.indicatorPosition) s.p = settings.indicatorPosition;
    if (settings.size !== defaultSettings.size) s.z = settings.size;
    if (settings.displayShadow !== defaultSettings.displayShadow) s.ds = settings.displayShadow;
    if (settings.displayBorder !== defaultSettings.displayBorder) s.db = settings.displayBorder;
    if (settings.displayIndicator !== defaultSettings.displayIndicator) s.di = settings.displayIndicator;
    if (settings.duration !== defaultSettings.duration) s.d = settings.duration;
    if (settings.revolutions !== defaultSettings.revolutions) s.r = settings.revolutions;
    if (settings.resultVariation !== defaultSettings.resultVariation) s.rv = settings.resultVariation;
    if (settings.easing !== defaultSettings.easing) s.e = settings.easing;
    if (settings.counterClockwise !== defaultSettings.counterClockwise) s.cc = settings.counterClockwise;
    if (settings.horizontalContent !== defaultSettings.horizontalContent) s.hc = settings.horizontalContent;
    if (settings.baseDisplay !== defaultSettings.baseDisplay) s.bd = settings.baseDisplay;
    if (settings.baseSize !== defaultSettings.baseSize) s.bs = settings.baseSize;
    if (settings.baseDisplayShadow !== defaultSettings.baseDisplayShadow) s.bds = settings.baseDisplayShadow;
    if (settings.baseDisplayIndicator !== defaultSettings.baseDisplayIndicator) s.bdi = settings.baseDisplayIndicator;
    if (settings.baseBackground !== defaultSettings.baseBackground) s.bb = settings.baseBackground;
    if (settings.baseHtmlContent !== defaultSettings.baseHtmlContent) s.bhc = settings.baseHtmlContent;
    
    optimized.s = s;

    return optimized;
  };

  // Restaurer la structure complète des données
  const restoreConfigData = (optimized) => {
    // Valeurs par défaut
    const defaultSettings = {
      centeredIndicator: false,
      indicatorPosition: "top",
      size: 300,
      displayShadow: false,
      displayBorder: false,
      displayIndicator: true,
      duration: 4,
      revolutions: 3,
      resultVariation: 0,
      easing: "ease",
      counterClockwise: false,
      horizontalContent: false,
      baseDisplay: false,
      baseSize: 100,
      baseDisplayShadow: false,
      baseDisplayIndicator: false,
      baseBackground: "",
      baseHtmlContent: ""
    };
    
    // Créer une structure complète
    const config = {
      items: [],
      firstItemIndex: optimized.f,
      wheelSettings: { ...defaultSettings },
      name: optimized.n
    };

    // Restaurer les items
    optimized.i.forEach(item => {
      config.items.push({
        id: item.i,
        name: item.n,
        htmlContent: item.h || "",
        textColor: item.t || "",
        background: item.b || ""
      });
    });

    // Restaurer les paramètres
    const s = optimized.s;
    if (s.c !== undefined) config.wheelSettings.centeredIndicator = s.c;
    if (s.p !== undefined) config.wheelSettings.indicatorPosition = s.p;
    if (s.z !== undefined) config.wheelSettings.size = s.z;
    if (s.ds !== undefined) config.wheelSettings.displayShadow = s.ds;
    if (s.db !== undefined) config.wheelSettings.displayBorder = s.db;
    if (s.di !== undefined) config.wheelSettings.displayIndicator = s.di;
    if (s.d !== undefined) config.wheelSettings.duration = s.d;
    if (s.r !== undefined) config.wheelSettings.revolutions = s.r;
    if (s.rv !== undefined) config.wheelSettings.resultVariation = s.rv;
    if (s.e !== undefined) config.wheelSettings.easing = s.e;
    if (s.cc !== undefined) config.wheelSettings.counterClockwise = s.cc;
    if (s.hc !== undefined) config.wheelSettings.horizontalContent = s.hc;
    if (s.bd !== undefined) config.wheelSettings.baseDisplay = s.bd;
    if (s.bs !== undefined) config.wheelSettings.baseSize = s.bs;
    if (s.bds !== undefined) config.wheelSettings.baseDisplayShadow = s.bds;
    if (s.bdi !== undefined) config.wheelSettings.baseDisplayIndicator = s.bdi;
    if (s.bb !== undefined) config.wheelSettings.baseBackground = s.bb;
    if (s.bhc !== undefined) config.wheelSettings.baseHtmlContent = s.bhc;

    return config;
  };

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
        
        // Compresser les données pour obtenir une URL plus courte
        const encodedData = compressData(shareData);
        
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
            // Décompresser la configuration
            const config = decompressData(encodedConfig);
            
            if (!config) {
              console.error('Invalid configuration data');
              return;
            }
            
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