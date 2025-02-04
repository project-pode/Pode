const theme = {
    exerciseFont: {
        color: "rgba(187,144,214,1)",
        fontSize: 28,
        fontWeight: "bold",
        fontFamily: "AlfaSlabOne",
        padding: 10,
      },
      dropZone: {
        height: 100,
        marginVertical: 20,
        backgroundColor: "rgba(237,220,249,1)",
        borderColor: "rgba(187,144,214,1)",
        borderRadius: 48,
        borderWidth: 7,
        justifyContent: 'space-around'
    },
    boxesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    centeredContent: {
        flex: 1, // Fills the parent Pressable
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },
};

export default theme;
