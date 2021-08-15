import { actions, follow, unfollow } from "./users-reducer"
import { usersAPI } from "../api/users-api"
import { ResponseType, ResultCodesEnum } from "../api/api"

jest.mock("../api/users-api")
let userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(()=>{

    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.follow.mockClear();
    userAPIMock.unfollow.mockClear();
})

const result: ResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages:[],
    data:{}
}


test ('follow thunk', async()=>{
    userAPIMock.follow.mockReturnValue(Promise.resolve(result))
    const thunk = follow(1)

    await thunk(dispatchMock,getStateMock, {} )

expect(dispatchMock).toBeCalledTimes(3)
expect(dispatchMock).toHaveBeenCalledWith( actions.toggleFollowingProgress(true, 1));
expect(dispatchMock).toHaveBeenCalledWith( actions.followSuccess(1));
expect(dispatchMock).toHaveBeenCalledWith( actions.toggleFollowingProgress(false, 1));

})

test ('unfollow thunk', async()=>{
    userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))
    const thunk = unfollow(1)

    await thunk(dispatchMock,getStateMock, {} )
    
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
    
    })