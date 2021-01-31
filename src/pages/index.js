import {
  useColorMode,
  useDisclosure
} from "@chakra-ui/react"
import { AddSubject } from '../components/AddSubject'
import { Card } from "../components/Card"
import { ClassCard } from "../components/ClassCard"
import { Container } from '../components/Container'
import { Content } from '../components/Content'
import { Header } from '../components/Header'
import { ModalAddClass } from '../components/ModalAddClass'

const Index = () => {
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure()
  const { isOpen: isOpenAddSubject, onToggle: onToggleAddSubject } = useDisclosure()

  return (
    <Container minH="100vh">
      <Header />
      <Content>
        <Card code="(75,05)" subject="Analisis" openModal={onOpenModal}>
          <ClassCard />
          <ClassCard />
          <ClassCard />
        </Card>
        <AddSubject isOpen={isOpenAddSubject} onToggle={onToggleAddSubject} />
      </Content>
      <ModalAddClass isOpen={isOpenModal} onOpen={onOpenModal} onClose={onCloseModal} />
    </Container >
  )
}

export default Index
