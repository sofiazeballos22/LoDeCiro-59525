import { StyleSheet, Text, View, Pressable, Modal } from 'react-native'



const DeleteModal = () => {
  return (
    <Modal
        animationType = 'fade'
        visible = {modalVisible}
    >
        <View>
            <Pressable style={style.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={style.closeText}>x</Text>
            </Pressable>

            <View style={style.textsContainer}>
                <Text style={style.modelTitle}>Confirmar eliminación</Text>
                <Text style={style.modalText}>{taskSelected.value}</Text>
                <Text style={style.modalDeleteTextWarning}>
                Esta acción no se puede deshacer
                </Text>
            </View>
        

            <View style={style.buttonsContainer}>
                <Pressable
                    style={style.cancelButton}
                    onPress={()=>setModalVisible(false)}
                >
                    <Text style={style.cancelText}>Cancelar</Text>
                </Pressable>
                <Pressable
                    style={style.deleteButton}
                    onPress={handleDeleteTask}
                >
                    <Text style={style.deleteText}>Si, eliminar</Text>
                </Pressable>
            </View>
        </View> 
    </Modal>
  );
}

export default DeleteModal

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#fff',
        flex: 1,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 30,
    },
    closeText: {
        color: 'red',
        fontSize: 30,
    },
    textsContainer: {
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    modalTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    modalText: {
        color: "#fff",
        fontSize: 20,
    },
    modalDeleteTextWarning: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
    },
    buttonsContainer: {
        padding: 30,
        flexDirection: "row",
        gap: 10,
    },
    deleteButton: {
        backgroundColor: "#c71919",
        width: "48%",
        padding: 10,
        borderRadius: 15,
    },
    deleteText: {
        textAlign: "center",
        fontSize: 16,
        color: "#fff",
    },
    cancelButton: {
        backgroundColor: "#fff",
        width: "45%",
        padding: 10,
        borderRadius: 20,
    },
    cancelText: {
        textAlign: "center",
        fontSize: 14,
        color: "# 36363"
    },

})