import { CloseIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Link,
  Select
} from '@chakra-ui/react'
import { Field, FieldArray, Form, Formik } from 'formik'
import { generate } from 'shortid'
import { useDataStore } from '../Context'

export const FormLesson = ({ onClose, initialRef, subjectId }) => {
  const { addLesson, subjectsOrder, subjects } = useDataStore(state => ({
    addLesson: state.addLesson,
    subjectsOrder: state.subjectsOrder,
    subjects: state.subjects
  }))
  return (
    <Formik
      initialValues={{
        subjectId,
        teacher: '',
        lessonCode: '',
        schedules: [{ id: generate(), day: '', since: '', until: '' }]
      }}
      onSubmit={(values, actions) => {
        console.log(values)
        addLesson(values)
        actions.resetForm()
        onClose()
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {props => (
        <Form>
          <Flex flexDir='column'>
            <Field name='subjectId'>
              {({ field, form }) => (
                <FormControl>
                  <FormLabel htmlFor='subjectId'>Materia</FormLabel>
                  <Select
                    {...field}
                    id='subjectId'
                    color='gray.400'
                    borderColor='gray.400'
                    isRequired
                  >
                    {subjectsOrder.map(id => (
                      <option value={id}>{subjects[id].name}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>{form.errors.subjectId}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='lessonCode'>
              {({ field, form }) => (
                <FormControl mt={4}>
                  <FormLabel htmlFor='lessonCode'>Curso</FormLabel>
                  <Input
                    {...field}
                    id='lessonCode'
                    placeholder='Clase'
                    ref={initialRef}
                    borderColor='gray.400'
                    isRequired
                  />
                  <FormErrorMessage>{form.errors.lessonCode}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='teacher'>
              {({ field, form }) => (
                <FormControl mt={4}>
                  <FormLabel htmlFor='teacher'>Catedra</FormLabel>
                  <Input
                    {...field}
                    id='teacher'
                    placeholder='Catedra'
                    borderColor='gray.400'
                    isRequired
                  />
                  <FormErrorMessage>{form.errors.teacher}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <FormLabel mt={4}>Horarios</FormLabel>
            <FieldArray
              name='schedules'
              validateOnChange={false}
              validateOnBlur={false}
            >
              {({ push, remove }) => (
                <Flex flexDir='column'>
                  {props.values.schedules.map((schedule, index) => {
                    return (
                      <Flex key={schedule.id} alignItems='center'>
                        <Field name={`schedules[${index}].day`}>
                          {({ field, form }) => (
                            <FormControl>
                              <Select
                                {...field}
                                id='day'
                                placeholder='Dia'
                                borderEndRadius={0}
                                borderEndStartRadius={
                                  props.values.schedules[index + 1] ? 0 : 'md'
                                }
                                borderStartStartRadius={
                                  props.values.schedules[index - 1] ? 0 : 'md'
                                }
                                color='gray.400'
                                borderColor='gray.400'
                                isRequired
                              >
                                <option value='lunes'>Lunes</option>
                                <option value='martes'>Martes</option>
                                <option value='miercoles'>Miercoles</option>
                                <option value='jueves'>Jueves</option>
                                <option value='viernes'>Viernes</option>
                                <option value='sabado'>Sabado</option>
                                <option value='domingo'>Domingo</option>
                              </Select>
                            </FormControl>
                          )}
                        </Field>
                        <Field name={`schedules[${index}].since`}>
                          {({ field, form }) => (
                            <FormControl>
                              <Input
                                {...field}
                                id='since'
                                type='time'
                                borderColor='gray.400'
                                borderRadius={0}
                                max={props.values.schedules[index].until}
                                isRequired
                              />
                            </FormControl>
                          )}
                        </Field>
                        <Field name={`schedules[${index}].until`}>
                          {({ field, form }) => (
                            <FormControl>
                              <Input
                                {...field}
                                id='until'
                                type='time'
                                borderColor='gray.400'
                                borderStartRadius={0}
                                borderStartEndRadius={
                                  props.values.schedules[index - 1] ? 0 : 'md'
                                }
                                borderEndEndRadius={
                                  props.values.schedules[index + 1] ? 0 : 'md'
                                }
                                min={props.values.schedules[index].since}
                                isRequired
                              />
                            </FormControl>
                          )}
                        </Field>
                        {props.values.schedules.length > 1 && (
                          <IconButton
                            ml={1}
                            size='xs'
                            variant='unstyled'
                            onClick={() => remove(index)}
                            icon={<CloseIcon />}
                            _hover={{ color: 'red.300' }}
                          />
                        )}
                      </Flex>
                    )
                  })}
                  <Link
                    mt={2}
                    textAlign='center'
                    onClick={() =>
                      push({ id: generate(), day: '', since: '', until: '' })
                    }
                  >
                    Adicionar horario
                  </Link>
                </Flex>
              )}
            </FieldArray>
            <Flex alignSelf='flex-end' mt={6}>
              <Button colorScheme='blue' mr={3} type='submit'>
                Salvar
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </Flex>
          </Flex>
        </Form>
      )}
    </Formik>
  )
}
