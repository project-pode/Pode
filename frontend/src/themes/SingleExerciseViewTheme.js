const theme = {
    blueContainer: {  // Theme used in: LessonView
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "rgba(127,222,255,1)",
        justifyContent: "center",
      },
      whiteContainerExercises: {
        marginVertical: 18, 
        marginHorizontal: 18, 
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "rgba(75,113,123,1)",
        borderRadius: 48,
        borderWidth: 7,
        alignContent: "center",
        padding: 10,
        flex: 1,
      },

      exerciseDescription: { 
        color: "rgba(75,113,123,1)",
        fontSize: 18,
        textAlign: "left",
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontFamily: "AlfaSlabOne",
        lineHeight: 24,
      },
      greenButton: {    // Theme used in: LessonView
        margin: 20,
        padding: 10,
        backgroundColor: "#84DC95",
        borderRadius: 33,
        borderWidth: 6,
        borderColor: "#4A8055",
      },
      greenButtonText: {
        color: "#4A8055",
        fontSize: 45,
        textAlign: "center",
        fontFamily: "AlfaSlabOne",
      },
      greenButtonDeselected: {
        margin: 20,
        padding: 10,
        backgroundColor: "#C2D6C6",
        borderRadius: 33,
        borderWidth: 6,
        borderColor: "#A2B1A5",
      },    
      greenButtonTextDeselected: {
        color: "#A2B1A5",
        fontSize: 45,
        textAlign: "center",
        fontFamily: "AlfaSlabOne",
      },
};

export default theme;