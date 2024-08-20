/*
* 2007-2019 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    Sarbacane Software <contact@sarbacane.com>
*  @copyright 2020 Sarbacane Software
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*/

var SD_CART_UPDATED = false;
try {
    window.addEventListener('load', function() {
        try {
            if (typeof $ === 'function') {
                const url = SD_CART_URL + 'cartupdate.php?validate=' + SD_VALIDATE;
                $.ajax(url);
                if (SD_VALIDATE === 0) {
                    if (typeof prestashop !== 'undefined' && prestashop && prestashop.on) {
                        prestashop.on('updateCart', function() {
                            SD_CART_UPDATED = true;
                        });
                    } else {
                        $(document).ajaxSuccess(function(event, xhr, settings) {
                            if (settings) {
                                if (settings.data && settings.data.indexOf('controller=cart') !== -1) {
                                    SD_CART_UPDATED = true;
                                }
                            }
                        });
                    }
                    setInterval(function() {
                        if (SD_CART_UPDATED) {
                            SD_CART_UPDATED = false;
                            $.ajax(url);
                        }
                    }, 20000);
                }
            }
        } catch (e) {}
    });
} catch (e) {}
