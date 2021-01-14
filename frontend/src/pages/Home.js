import React from 'react';

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            This is my solution for Reaktor <a href="https://www.reaktor.com/junior-dev-assignment/">pre-assignment</a>
            for junior developer 2021. <br /><br />
            <span style={{ color: "red" }}>Backend DOES NOT keep cache up-to-date</span> all the time, so it may take a couple of minutes to get fresh data
            if nobody has visited the page for a while. After that the data is about as fresh as the original API serves, but
            caching is again stopped if no page has been loaded for a while.
        </div>
    )
}