# Bar Perks - API REST
Use a API REST para obter informações públicas e privadas com usuários autenticados.

<h2>Sobre a API</h2>

Este artigo descreve como usar a API REST com o auxílio da GitHub CLI, do JavaScript ou do curl. Para ver um guia de início rápido, confira "Início Rápido para a API REST do GitHub".

Ao fazer uma solicitação à API REST, você especificará um método HTTP e um caminho. Além disso, você também pode especificar cabeçalhos de solicitação e parâmetros de caminho, consulta ou corpo. A API retornará o código de status de resposta, os cabeçalhos de resposta e, potencialmente, um corpo de resposta.

A documentação de referência da API REST descreve o método HTTP, o caminho e os parâmetros para cada operação. Ela também exibe exemplos de solicitações e respostas para cada operação. 


<h2>Autenticação</h2>

Muitas operações exigem autenticação, embora algumas operações de API REST estejam acessíveis sem autenticação, você precisa se autenticar na GitHub CLI para usar o subcomandoapi.

<h3>Sobre os tokens</h3>

Você pode autenticar sua solicitação adicionando um token.

Se quiser usar a API REST do GitHub para uso pessoal, crie um personal access token atravé do login. As operações da API REST usadas neste artigo exigem o escopo repo para personal access tokens (classic) ou, a menos que haja outra indicação, o acesso somente leitura a repositórios públicos para fine-grained personal access tokens. Outras operações podem exigir escopos ou permissões diferentes.

<h3>Sobre os Parâmetros</h3>

Os parâmetros modificam o caminho da operação. Por exemplo, o caminho "Excluir um cliente" é /client/{id}. As chaves {} denotam parâmetros que você precisa especificar.

<h3>Sobre o Upload</h3>

Você pode fazer o upload de imagem enviando no cabeçalho um: "Content-Type": "multipart/form-data" e insirindo a sua imagem.
Podendo enviar uma imagem nos formatos de jpeg, jpg e png.