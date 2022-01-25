
const APP_ID = 'cdbb3181449045d096013c71b35b445c'
const CHANNEL = 'TalksLive'
const TOKEN = '006cdbb3181449045d096013c71b35b445cIABl3RJidF4sFEgni/mhy5ZKeqmUnPLoe9ZzcFAQ2TCUxmu72JcAAAAAEABLPQ3JyYzoYQEAAQCFjOhh'
let UID;

const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
    UID = await client.join(APP_ID, CHANNEL, TOKEN, null)

    localTracks = await AgoraRTC.createMicraphoneAndCameraTracks()

    let player = `<div class="video-container" id="user-container-${UID}">
                        <div class="username-wrapper"><span class="user-name">My Name</span></div>
                         <div class="video-player" id='user-${UID}'></div>
                </div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play('user-${UID}')

    await client.publish([localTracks[0], localTracks[1]])
}

joinAndDisplayLocalStream