import { IconButton } from '@chakra-ui/button'
import {
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Stack,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { BsThreeDots } from 'react-icons/bs'
import { ClassCard } from '../components/ClassCard'
import { useDataStore } from '../ContextZustand'
import { colors } from '../utils/subjectColorGenerator'

const EditForm = ({ subject, color }) => {
  const deleteSubject = useDataStore(state => state.deleteSubject)
  return (
    <Formik
      /* initialValues={{ code: subject.code, name: subject.name, active: subject.isActive, color:subject.color }} */
      initialValues={{
        code: subject.code,
        name: subject.name,
        active: true,
        color: color
      }}
      onSubmit={(values, actions) => {
          //Edit subject
        console.log(values, actions)
        onToggle()
        actions.resetForm()
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {props => (
        <Form>
          <Stack spacing={2} p={2}>
            <Flex>
              <Field name='code'>
                {({ field, form }) => (
                  <Input
                    {...field}
                    type='number'
                    id='code'
                    placeholder='Codigo'
                    borderEndRadius='none'
                    isRequired
                    w='30%'
                  />
                )}
              </Field>
              <Field name='name'>
                {({ field, form }) => (
                  <Input
                    {...field}
                    id='name'
                    placeholder='Materia'
                    borderStartRadius='none'
                    isRequired
                  />
                )}
              </Field>
            </Flex>
            <Flex>
              <Field name='active'>
                {({ field, form }) => (
                  <Select {...field}>
                    <option value={true}>Habilitado</option>
                    <option value={false}>Deshabilitado</option>
                  </Select>
                )}
              </Field>
            </Flex>
            <Flex>
              {/* TODO: mejorar seleccionador de colores */}
              <Field name='color'>
                {({ field, form }) => (
                  <Select {...field}>
                    {Object.keys(colors).map(colorKey => (
                      <option value={colorKey}> {colorKey}</option>
                    ))}
                  </Select>
                )}
              </Field>
            </Flex>

            <Button
              isLoading={props.isSububmitting}
              type='submit'
              size='sm'
              bg='green.300'
              color='white'
              _hover={{ bg: 'green.400' }}
            >
              Salvar
            </Button>

            <Button
              size='sm'
              bg='red.300'
              color='white'
              onClick={() => {
                deleteSubject(subject.id)
              }}
              _hover={{ bg: 'red.400' }}
            >
              Eliminar
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}

const EditSubject = ({ isOpen, onToggle, children, subject, color }) => {
  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.50', dark: 'gray.500' }

  return (
    <Popover isOpen={isOpen} onOpen={onToggle} onClose={onToggle}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent bg={bgColor[colorMode]} w='300px'>
        <PopoverHeader textAlign='center' fontWeight='semibold'>
          Editar
        </PopoverHeader>
        <PopoverCloseButton mt={1} />
        <EditForm subject={subject} color={color} />
      </PopoverContent>
    </Popover>
  )
}

export const Card = ({ subject, lessons, openModal }) => {
  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.100', dark: 'gray.600' }
  const {
    isOpen: isOpenAddSubject,
    onToggle: onToggleAddSubject
  } = useDisclosure()
  const [color, setColor] = useState('tomato')

  return (
    <Flex
      flexDir='column'
      bg={bgColor[colorMode]}
      borderRadius='md'
      m={2}
      w={300}
      minW={300}
      overflow='hidden'
    >
      <Flex
        alignItems='center'
        justify='space-between'
        bg={color}
        px={3}
        h={10}
      >
        <Heading fontSize='md' color='white'>
          {subject.code} {subject.name}
        </Heading>
        <EditSubject
          isOpen={isOpenAddSubject}
          onToggle={onToggleAddSubject}
          subject={subject}
          color={color}
        >
          <IconButton
            variant='ghost'
            fontSize='18px'
            icon={<BsThreeDots />}
            size='sm'
            color='white'
            _hover={{}}
            _active={{}}
            _focus={{}}
          />
        </EditSubject>
      </Flex>
      <Droppable droppableId={subject.id}>
        {provided => (
          <Flex
            flexDir='column'
            ref={provided.innerRef}
            {...provided.droppableProps}
            mx={2}
          >
            {lessons.map((lesson, index) => (
              <ClassCard key={lesson.id} lesson={lesson} index={index} />
            ))}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
      <Link m={2} onClick={openModal} fontSize='sm'>
        Add Catedra...
      </Link>
    </Flex>
  )
}
