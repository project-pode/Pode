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
};

export default PopUpTheme;