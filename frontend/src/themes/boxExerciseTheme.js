const theme = {
    boxExerciseBox: {
        overflow: 'hidden', 
        marginHorizontal: 5,
        marginVertical: 10,
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
        minHeight: 100,
        marginVertical: 30,
        backgroundColor: "rgba(237,220,249,1)",
        borderColor: "rgba(187,144,214,1)",
        borderRadius: 48,
        borderWidth: 7,
        justifyContent: 'space-around',
        flex: 1
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
    pressableBox: {
      position: 'relative', 
      left: 0, 
      right: 0, 
      top: 0, 
      bottom: 0,
    }

};

export default theme;
