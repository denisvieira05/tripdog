const rewire = require("rewire")
const GeneralHeader = rewire("./GeneralHeader")
const mapStateToProps = GeneralHeader.__get__("mapStateToProps")
// @ponicode
describe("mapStateToProps", () => {
    test("0", () => {
        let callFunction = () => {
            mapStateToProps({ authentication: { isAuthenticated: true, loggedUser: "user name" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            mapStateToProps({ authentication: { isAuthenticated: false, loggedUser: 123 } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            mapStateToProps({ authentication: { isAuthenticated: true, loggedUser: "user123" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            mapStateToProps({ authentication: { isAuthenticated: true, loggedUser: 123 } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            mapStateToProps({ authentication: { isAuthenticated: true, loggedUser: "user-name" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            mapStateToProps(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
