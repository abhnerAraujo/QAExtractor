# QAExtractor

This project seeks to implement a question/answer extractor API. The implementation is based on this [article][artic1], which proposes reverse-engineering Q&A collections from any text. 
The final purpose of this project is to viabilize the creation of a chatbot capable of help high school studants on their studies, acting as a academic monitoring.
This project is also a part of a graduation work, at the Centro de Informática (CIn) - Universidade Federal de Pernambuco (UFPE).

### Tech (dependencies)

* **LinguaKit** - A Natural Language Processing tool (Perl)
* **Node.Js** - An open source server environment

### Installation

* Follow [LinguaKit]'s instructions to install Perl and the project itself (required)
* Follow [Node.Js][node]'s installation instructions
* Fork this repository
* Use:
```sh
$ cd QAExtractor
$ npm install -d
$ npm start
```

### Limitations

As said before, this implemetation was a part of a graduation project therefore needs some refactoring or you will be experiencing a lot of slowness (bad scalability).

### TODO

Asynchronously process each question class.

### Credits

* Author: Abhner Araujo (afga@cin.ufpe.br) 
* Advisor: Sergio Queiroz (srmq@cin.ufpe.br)

[artic1]: <https://link.springer.com/chapter/10.1007%2F978-1-4020-4746-6_17>
[linguakit]: <https://github.com/citiususc/Linguakit>
[node]: <https://github.com/nodejs/node>