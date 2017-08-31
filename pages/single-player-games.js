
'use strict';

let I;

module.exports = {

  _init() {
    I = require('../steps_file.js')();
  },
  masterCode: '4gamer',
  // Generic single-player game page locators
  editionPlate: function(n){
  	return {css:'#product-edition-' + n};
  },
  buttonBuy: {
  	//active: {css: '#button-buyEdition:not([disabled="disabled"])'},
    active: {css: '#button-buyEdition'},
  	disabled: {css: '#button-buyEdition[disabled="disabled"]'}
  },
  codesLink: {
    css: '#link-boughtCodes'
  },

  priceDiv: {
  	css: '#div-sumWithoutDiscount'
  },
  priceDivDiscount: {
  	css: '#div-sumWithDiscount'
  },
  platformMessage: {
    css: '.bSingleplayerBuy__eMessage',
    icon: {
      "Steam": {
        css: '.bSingleplayerBuy__eMessage .bSingleplayerBuy__eIcon__mPlatform-steam'
      },
      "Uplay": {
        css: '.bSingleplayerBuy__eMessage .bSingleplayerBuy__eIcon__mPlatform-uplay'
      }
    }
  },

  promoCodeLink: {
  	css: '#link-enterPromoCode'
  },
  promoCodeField: {
  	css: '#field-discountCode'
  },
  promoCodeClear: {
  	css: '#button-crossClear'
  },
  promoCodeSuccess: {
  	css: '#div-successActivation'
  },
  promoCodeFail: {
  	css: '#div-failedActivation'
  },

  bonuses:{
  	css: '#purchase-editions-bonuses'
  },
  prizeLink:{
    css: '.game-purchase-bonuses-prizes span.game-link'
  },
  prizeTooltip:{
    css: '.game-purchase-bonuses-prizes .bUIHint__ePopup'
  },

  errorMessage: {
  	css: '.bSingleplayerBuy .bInfoMessage__mType_error'
  },
  errorText: {
  	noKeys: 'Ключи временно закончились'
  },

  editionSwitcher: {
  	css: '#game-editions-switcher-content'
  },

  editionRadio: function(n){
    //return {css: '#game-editions-switcher-content li:nth-child(' + n + ') .bSectionSwitch__eItem__eInput'};
    return {css: '#game-editions-switcher-content li:nth-child(' + n + ')'};
  },

  codesPage: {
    goBackLink: {
      css: '#button-buyAnotherOne'
    },
    serialCode: {
      css: '#field-serialCode'
    },
    preorderText: {
      css: '#div-ticketTitle'
    },
    codeInstructionLink: {
      css: '.game-code-serial-faq span.game-link'
    },
    platformLink: {
      css: '.game-code-serial-faq a.game-link'
    },
    recommendedLink: function(url){
      return {css: '.game-ticket-indent>ul.game-columns a[href="' + url + '"]'}
    }
  },

  
  //Generic single-player game page methods
	checkGamePurchaseIsDone(game){
    //TODO: разобраться, как можно определить успешную покупку у юзера с уже имеющимися заказами
		if(game.status === 'preorder'){
			I.waitForVisible(this.codesPage.preorderText, 30);
		}else{
			I.waitForVisible(this.codesPage.serialCode, 30);
		};
		I.seeInCurrentUrl('/codes');
	},

  verifyEditionPrices(edition){
    I.see(edition.price.full, this.priceDiv);
    I.see(edition.price.bonus, this.bonuses);
    if(edition.gold){
      let goldPlate = this.editionPlate(edition.gold);
      I.seeElement(goldPlate);
      I.see(edition.name.toUpperCase(), goldPlate);
    }
    I.waitForVisible(this.promoCodeField, 30);
    I.fillField(this.promoCodeField, this.masterCode);
    I.waitForVisible(this.priceDivDiscount, 10);
    I.see(edition.price.discount, this.priceDivDiscount);
    I.dontSee(edition.price.bonus, this.bonuses);
  },

  verifyGamePrices(game){
    I.waitForVisible(this.promoCodeLink, 30);
    I.click(this.promoCodeLink);
    let edition;
    let editionsList = Object.keys(game.editions);
    editionsList.forEach((edition) => {
        if(editionsList.length > 1){
          I.click(this.editionRadio(game.editions[edition].order));
        }
        this.verifyEditionPrices(game.editions[edition]);
      });
  },

  buy(edition){
    if(edition.order){
      I.click(this.editionRadio(edition.order));
    }
    I.waitAndClick(this.buttonBuy.active);
  },

  buyWithDiscount(edition){
    if(edition.order){
      I.click(this.editionRadio(edition.order));
    }
    I.waitForVisible(this.promoCodeLink, 30);
    I.click(this.promoCodeLink);
    I.waitForVisible(this.promoCodeField, 30);
    I.fillField(this.promoCodeField, this.masterCode);
    I.waitForVisible(this.priceDivDiscount, 10);
    I.waitAndClick(this.buttonBuy.active);
  }

}
