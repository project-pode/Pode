const PopUpTheme = {
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        width: 300,
        padding: 20,
        backgroundColor: '#7DBCCD',
        borderRadius: 33,
        alignItems: 'center',
        borderWidth: 6,
        borderColor: '#4B717B'
    },
    message: {
        fontFamily: 'AlfaSlabOne',
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
        color: '#4B717B',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 10,
        margin: 5,
        backgroundColor: '#BB90D6',
        borderRadius: 33,
        borderWidth: 6,
        alignItems: 'center',
        borderColor: '#87699B'
    },
    buttonText: {
        fontFamily: 'AlfaSlabOne',
        color: '#87699B',
        fontSize: 16,
    },
    popUpCorrect: {
        margin: 20,
        padding: 30,
        backgroundColor: "#84DC95",
        borderRadius: 33,
        borderWidth: 6,
        borderColor: "#4A8055",
    },
    popUpMessageCorrect: {
        color: "#4A8055",
        fontSize: 20,
        textAlign: "center",
        fontFamily: "AlfaSlabOne",
    },
    popUpIncorrect: {
        margin: 20,
        padding: 30,
        backgroundColor: "#dc8484",
        borderRadius: 33,
        borderWidth: 6,
        borderColor: "#804a4a",
    },
    popUpMessageIncorrect: {
        color: "#804a4a",
        fontSize: 20,
        textAlign: "center",
        fontFamily: "AlfaSlabOne",
    },
};

export default PopUpTheme;