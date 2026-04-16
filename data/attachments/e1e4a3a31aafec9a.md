# Page snapshot

```yaml
- generic [ref=e2]:
  - region "Notifications (F8)":
    - list
  - region "Notifications alt+T"
  - generic [ref=e5]:
    - generic [ref=e6]:
      - img [ref=e8]
      - heading "Login" [level=1] [ref=e11]
      - paragraph [ref=e12]: Acesse o sistema de produtos
    - generic [ref=e13]:
      - generic [ref=e14]:
        - generic [ref=e15]: Usuário
        - generic [ref=e16]:
          - img [ref=e17]
          - textbox "Usuário" [active] [ref=e20]: admin
      - generic [ref=e21]:
        - generic [ref=e22]: Senha
        - generic [ref=e23]:
          - img [ref=e24]
          - textbox "Senha" [ref=e27]
      - button "Entrar" [ref=e28] [cursor=pointer]
    - generic [ref=e29]:
      - generic [ref=e30]:
        - img [ref=e31]
        - generic [ref=e33]: Use credenciais cadastradas no sistema
      - generic [ref=e34]:
        - button "Debug" [ref=e35] [cursor=pointer]:
          - img
          - text: Debug
        - button "Reset" [ref=e36] [cursor=pointer]:
          - img
          - text: Reset
        - button "Teste" [ref=e37] [cursor=pointer]:
          - img
          - text: Teste
```