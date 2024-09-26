export default () => {
  return (
    {
      fields: [
        {
          errorMessage: "Chyba",
          helperText: "Jméno a příjmení",
          label: "Jméno a příjmení",
          placeholder: "Jméno a příjmení",
          required: false,
          __typename: "ComponentFormTetxField"
        },
        {
          errorMessage: "Chyba",
          helperText: "Email",
          label: "Email",
          placeholder: "Email",
          required: false,
          __typename: "ComponentFormTetxField"
        },
        {
          errorMessage: "Chyba",
          helperText: "Telefon",
          label: "Telefon",
          placeholder: "Telefon",
          required: false,
          __typename: "ComponentFormTetxField"
        },
        {
          errorMessage: "Chyba",
          item: [
            {label: '300 x 300 cm', disabled: false, __typename: 'ComponentFormSelectItem'},
            {label: '300 x 300 cm', disabled: false, __typename: 'ComponentFormSelectItem'},
            {label: '300 x 300 cm', disabled: false, __typename: 'ComponentFormSelectItem'}
          ],
          label: "Burgrárna",
          placeholder: "",
          required: false,
          __typename: "ComponentFormRadio"
        },
        {
          errorMessage: "Chyba",
          helperText: "Kód",
          label: "Kód",
          placeholder: "Kód",
          required: false,
          __typename: "ComponentFormTetxField"
        },
      ]
    }
  )
}