import { Theme } from "./themeTypes";

const theme: Theme = {
    blueContainer: { 
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "rgba(127,222,255,1)",
        justifyContent: "center",
        padding: 5
    },
    whiteContainer: {
        marginVertical: 0,
        marginHorizontal: 18,
        backgroundColor: "rgba(255,255,255,1)",
        borderColor: "rgba(75,113,123,1)",
        borderRadius: 48,
        borderWidth: 7,
        padding: 10,
        flex: 1,
        justifyContent: 'space-between',  
        alignItems: 'stretch', 
    },
    
    arrowContainer: {
        height: 30,
        width: 30,
        margin: 10,
    },
    arrow: {
        fontSize: 30,
        color: "rgba(75,113,123,1)",
        fontFamily: 'AlfaSlabOne'
    },
    profileImage: {
        width: 125,
        height: 125,
        borderRadius: 75,
        marginBottom: 20,
        borderWidth: 5,
        borderColor: 'rgba(75,113,123,1)',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'AlfaSlabOne',
        textAlign: 'center',
        color: 'rgba(75,113,123,1)',

    },
    logoutButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
    },
    avatarContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-around'
    },
    avatar: {
        width: 100,
        height: 100,
        borderWidth: 5,
        borderColor: 'rgba(75,113,123,1)',
        borderRadius: 75,
    },
    selectedAvatar: {
        borderColor: 'rgba(75,113,123,1)',
    },

    profileViewButton: {
        marginHorizontal: 18,
        backgroundColor: "rgba(237,220,249,1)",
        borderColor: "rgba(187,144,214,1)",
        borderRadius: 48,
        borderWidth: 7,
        alignContent: "center",
        paddingVertical: 35,
    },

    profileViewButtonText: {
        color: "rgba(187,144,214,1)",
        fontSize: 20,
        textAlign: "center",
        fontFamily: "AlfaSlabOne",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    modalContent: {
        flex: 1,
        marginVertical: 30,
        width: '95%',
        backgroundColor: 'rgba(237,220,249,1)',
        position: 'relative',
        borderColor: "rgba(187,144,214,1)",
        borderRadius: 48,
        borderWidth: 7,
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeButtonContainer: {
        marginVertical: 10,
        marginHorizontal: 15
    },
    closeButtonText: {
        color: 'rgba(187,144,214,1)',
        fontSize: 24,
        fontFamily: 'AlfaSlabOne',
    },
    
};

export default theme;