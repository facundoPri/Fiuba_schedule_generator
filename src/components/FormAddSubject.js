import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  useColorMode
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { useDataStore } from '../Context'

export function FormAddSubject ({ onToggle, initialInpuRef }) {
  const { colorMode } = useColorMode()
  const color = { light: 'black', dark: 'white' }
  const {addSubject} = useDataStore(state => ({ addSubject: state.addSubject }))

  const validateCode = value => {
    let error
    if (!value) {
      error = 'Ingresar Codigo'
    } else if (isNaN(value)) {
      error = 'Codigo invalido'
    }
    return error
  }

  const validateSubject = value => {
    let error
    if (!value) {
      error = 'Ingresar Materia'
    } else if (!isNaN(value)) {
      error = 'Materia invalida'
    }
    return error
  }

  return (
    <Formik
      initialValues={{ code: '', name: '' }}
      onSubmit={(values, actions) => {
        addSubject(values)
        onToggle()
        actions.resetForm()
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {props => (
        <Form>
          <Flex w={300} minW={300} borderRadius='md' alignItems='baseline'>
            <Field name='code' validate={validateCode}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.code && form.touched.code}>
                  <Input
                    {...field}
                    type='number'
                    id='code'
                    placeholder='Codigo'
                    ref={initialInpuRef}
                    borderEndRadius='none'
                    isRequired
                  />
                  <FormErrorMessage>{form.errors.code}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='name' validate={validateSubject}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <Input
                    {...field}
                    id='name'
                    placeholder='Materia'
                    borderStartRadius='none'
                    isRequired
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              isLoading={props.isSubmitting}
              type='submit'
              ml={2}
              px={5}
              color={color[colorMode]}
            >
              Crear
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}
