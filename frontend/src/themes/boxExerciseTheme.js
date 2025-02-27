const theme = {
    boxExerciseBox: {
        minWidth: 80, 
        height: 40, 
        overflow: 'hidden', 
        margin: 20, 
        padding: 10,
        backgroundColor: "rgba(230,230,230,255)",
        borderRadius: 33,
        borderColor: "rgba(161,161,161,255)",
        borderWidth: 2
      },
      boxExerciseBoxText: {
        color: "rgba(187,144,214,1)",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
        fontFamily: "Cousine",
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
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    centeredContent: {
        flex: 1, // Fills the parent Pressable
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
    },

};

export default theme;
