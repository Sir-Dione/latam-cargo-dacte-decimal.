// ==UserScript==
// @name         LATAM Cargo - Formatar campos dacteVal como decimal
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Formata automaticamente todos os campos com classe .dacteVal como moeda decimal (ex: 4625 → 46.25)
// @match        https://www.latamcargo.com/pt/eminutadocument
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function formatToDecimal(value) {
        const numeric = value.replace(/[^\d]/g, '');
        if (!numeric) return '';
        const floatValue = parseFloat(numeric) / 100;
        return floatValue.toFixed(2);
    }

    document.body.addEventListener('input', (e) => {
        const input = e.target;
        if (input.classList.contains('dacteVal')) {
            input.value = formatToDecimal(input.value);
        }
    });

    document.body.addEventListener('paste', (e) => {
        const input = e.target;
        if (input.classList.contains('dacteVal')) {
            e.preventDefault();
            const pasted = (e.clipboardData || window.clipboardData).getData('text');
            input.value = formatToDecimal(pasted);
        }
    });
})();
