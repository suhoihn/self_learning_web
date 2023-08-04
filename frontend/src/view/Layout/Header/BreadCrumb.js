import React from 'react'

import { Link, useLocation } from 'react-router-dom'

import { Breadcrumb } from 'antd'

export default function BreadCrumb() {
    const Location = useLocation()
    console.log(Location)
    let pathSnippets = Location.pathname.split('/')
    console.log(pathSnippets)
    pathSnippets = pathSnippets.filter((i) => i)
    console.log(pathSnippets)
    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
        const page = `${pathSnippets.slice(index, index + 1)}`

        console.log(url)
        console.log(page)
        return {
            key: url,
            title: <Link to={page}>{page}</Link>
        }
    })

    return <Breadcrumb items={breadcrumbItems}/>;
}