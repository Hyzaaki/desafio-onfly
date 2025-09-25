"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
// Importa axios para fazer requisição HTTP
const axios_1 = __importDefault(require("axios"));
// Aqui criamos a classe que define nosso Node
class Random {
    constructor() {
        // Descrição do Node: como ele aparece dentro do n8n
        this.description = {
            displayName: 'Random', // Nome visível no editor
            name: 'random', // Nome interno
            group: ['transform'], // Grupo no menu (pode ser "transform", "utility", etc.)
            version: 1, // Versão do node
            description: 'Random.org number generator', // Descrição curta
            defaults: {
                name: 'Random', // Nome padrão quando arrasta pro workflow
            },
            inputs: ['main'], // Entrada (dados que chegam)
            outputs: ['main'], // Saída (dados que saem)
            properties: [
                {
                    displayName: 'Min', // Nome mostrado pro usuário
                    name: 'min', // Nome interno
                    type: 'number', // Tipo: número
                    default: 1, // Valor inicial
                    description: 'Valor mínimo',
                },
                {
                    displayName: 'Max',
                    name: 'max',
                    type: 'number',
                    default: 100,
                    description: 'Valor máximo',
                },
            ],
        };
    }
    // Aqui é o que o Node faz quando executa
    async execute() {
        // Pega os valores de "min" e "max" que o usuário digitou
        const min = this.getNodeParameter('min', 0);
        const max = this.getNodeParameter('max', 0);
        // Monta a URL da API do Random.org
        const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
        // Faz a requisição
        const response = await axios_1.default.get(url, { responseType: "text" });
        return [[
                {
                    json: {
                        randomNumber: parseInt(response.data.toString().trim(), 10),
                        min,
                        max
                    }
                }
            ]];
    }
}
exports.Random = Random;
