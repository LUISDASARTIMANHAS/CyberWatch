/**
 * Gerador de Laudos LDA CyberWatch
 * @author LUIS DAS ARTIMANHAS
 * @version 2.1
 */

/**
 * Gera um ID único e semântico para o certificado.
 * @returns {string} ID no formato LDA-ANO-RANDOM
 */
const generateTechnicalID = () => {
    const year = new Date().getFullYear();
    const randomHex = Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase().padStart(6, '0');
    return `LDA-${year}-${randomHex}`;
};

/**
 * Define a data atual no input de data e no output do laudo.
 */
const setDefaultDate = () => {
    const today = new Date().toISOString().split('T')[0];
    const inputData = document.getElementById('inData');
    const outData = document.getElementById('outData');
    
    if (inputData && outData) {
        inputData.value = today;
        outData.textContent = today.split('-').reverse().join('/');
    }
};

/**
 * Sincroniza um campo de input com sua representação visual no laudo.
 * @param {string} sourceId - ID do input/select de origem.
 * @param {string} targetId - ID do elemento de destino no certificado.
 */
const setupSync = (sourceId, targetId) => {
    const source = document.getElementById(sourceId);
    const target = document.getElementById(targetId);

    if (source && target) {
        source.addEventListener('input', () => {
            let val = source.value;
            // Formata data se o input for do tipo date
            if (source.type === 'date') {
                val = val.split('-').reverse().join('/');
            }
            target.textContent = val || "__________";
        });
    }
};

/**
 * Inicializa a aplicação e define valores padrão.
 */
const initApp = () => {
    const idField = document.getElementById('inID');
    const outID = document.getElementById('outID');
    const generatedID = generateTechnicalID();

    // Setup inicial
    idField.value = generatedID;
    outID.textContent = generatedID;
    setDefaultDate();

    // Mapeamento de Sincronização
    const syncMap = [
        ['inEmpresa', 'outEmpresa'],
        ['inSistema', 'outSistema'],
        ['inCapacidade', 'outCapacidade'],
        ['inData', 'outData']
    ];

    syncMap.forEach(([src, dest]) => setupSync(src, dest));
};

document.addEventListener('DOMContentLoaded', initApp);