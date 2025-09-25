// Importa interfaces do n8n (tipo a "linguagem" que ele entende)
import { IExecuteFunctions } from 'n8n-workflow';
import { INodeType, INodeTypeDescription } from 'n8n-workflow';
// Importa axios para fazer requisição HTTP
import axios from 'axios';

// Aqui criamos a classe que define nosso Node
export class Random implements INodeType {

  // Descrição do Node: como ele aparece dentro do n8n
  description: INodeTypeDescription = {
    displayName: 'Random',     // Nome visível no editor
    name: 'random',            // Nome interno
    group: ['transform'],      // Grupo no menu (pode ser "transform", "utility", etc.)
    version: 1,                // Versão do node
    description: 'Random.org number generator', // Descrição curta
    defaults: {
      name: 'Random',          // Nome padrão quando arrasta pro workflow
    },
    inputs: ['main'],          // Entrada (dados que chegam)
    outputs: ['main'],         // Saída (dados que saem)
    properties: [              // Definição dos parâmetros (inputs)
      {
        displayName: 'Min',    // Nome mostrado pro usuário
        name: 'min',           // Nome interno
        type: 'number',        // Tipo: número
        default: 1,            // Valor inicial
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

  // Aqui é o que o Node faz quando executa
  async execute(this: IExecuteFunctions) {
    // Pega os valores de "min" e "max" que o usuário digitou
    const min = this.getNodeParameter('min', 0) as number;
    const max = this.getNodeParameter('max', 0) as number;

    // Monta a URL da API do Random.org
    const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

    // Faz a requisição
    const response = await axios.get(url, { responseType: "text" });

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
