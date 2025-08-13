# PDF Attachment Manager

Um componente em **ReactJS + TypeScript** com **Material UI** para upload, gerenciamento e ordenação de arquivos PDF.  
Ele integra-se a um backend em **Spring Boot**, permitindo salvar metadados dos arquivos e definir propriedades como descrição, ordem e se o anexo é imprimível.

---

## ✨ Funcionalidades

- 📂 Upload automático de arquivos PDF
- 📝 Adição de descrição personalizada para cada arquivo
- 🖨️ Definição de arquivos como "Imprimíveis"
- 🗑️ Remoção de anexos
- 📋 Listagem em **grid responsivo**
- ↕️ Ordenação por arrastar e soltar via modal
- 🎨 Suporte a **dark mode**
- 🔗 Integração com backend em Spring Boot

---

## 🛠️ Tecnologias Utilizadas

- [ReactJS](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Material UI (MUI)](https://mui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [react-sortable-hoc](https://github.com/clauderic/react-sortable-hoc)
- [Spring Boot](https://spring.io/projects/spring-boot) (backend)
- [Styled Components](https://styled-components.com/) (customização de estilos)

---

## 📦 Instalação e Uso

### Frontend
```bash
# Clonar repositório
git clone https://github.com/seu-usuario/pdf-attachment-manager.git

# Entrar na pasta
cd pdf-attachment-manager

# Instalar dependências
npm install

# Rodar aplicação
npm run dev
