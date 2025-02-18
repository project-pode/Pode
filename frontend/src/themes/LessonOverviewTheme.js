const theme = {
    blueContainer: {  // Theme used in: LessonView
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "rgba(127,222,255,1)",
        justifyContent: "center",
      },
      whiteContainerInLessonOverview: {
        marginVertical: 20,
        marginHorizontal: 18,
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "rgba(75,113,123,1)",
        borderRadius: 48,
        borderWidth: 7,
        alignContent: "center",
        padding: 10,
        flex: 1,
      },
      pinkContainerInLessnOverview: {
        backgroundColor: "rgba(237,220,249,1)",
        borderColor: "rgba(187,144,214,1)",
        borderRadius: 48,
        borderWidth: 7,
        alignContent: "center",
        padding: 10,
        flex: 1,
      },
      overviewTitle: {
        color: "rgba(75,113,123,1)",
        fontSize: 30,
        textAlign: "center",
        paddingVertical: 30,
        fontFamily: "AlfaSlabOne",
        lineHeight: 24,
      },
      lessonOverviewDescription: {
        color: "rgba(75,113,123,1)",
        fontSize: 18,
        textAlign: "center",
        paddingVertical: 10,
        fontFamily: "AlfaSlabOne",
        lineHeight: 24,
      },

      LessonOverviewPercentage: {
        color: "rgba(75,113,123,1)",
        fontSize: 18,
        textAlign: "center",
        paddingVertical: 10,
        fontFamily: "AlfaSlabOne",
        lineHeight: 24,
        opacity: 0.8,
      },

      pillBar: {
        borderWidth: 3,
        borderRadius: 25,
        height: 50,
        borderColor: 'rgba(75,113,123,1)',
        justifyContent: 'center',
        alignItems: 'flex-start', // Align the fill to start from the left
        overflow: 'hidden', // Ensure the fill stays within the pill container
        width: '100%',
        backgroundColor: 'white', // Optional: background color for the pill
      },
      pillBarFill: {
        height: '100%',
        borderRadius: 25, // Matches the parent for consistent pill shape
        backgroundColor: '#84DC95', // Fill color
      },
      podeContainerInLessonView: {
        width: 134,
        height: 200,
        margin: 5,
      },
      exitButtonContainerInLessonView: {
        flexDirection: "column",
        justifyContent: "center",
    
      },
      emptySpaceFiller: {
        marginHorizontal: 50,
      },
      greenButtonInLessonOverview: {
        margin: 20,
        padding: 10,
        backgroundColor: "#84DC95",
        borderRadius: 33,
        borderWidth: 6,
        borderColor: "#4A8055",
      },
      exitButtonText: {
        fontFamily: "AlfaSlabOne",
        color: "rgba(74,128,85,1)",
        textAlign: "center",
        fontSize: 45,
        padding: 10,
      },
      podeIconInLessonView: {
        height: 200,
        width: 134,
        borderRadius: 98,
        marginHorizontal: 20,
        transform: [{ rotate: '-75deg' }]
      },
};

export default theme;