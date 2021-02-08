import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Links = () => {
  const { pathname } = useLocation()

  const linksList = [
    {
      name: 'Table',
      href: 'table',
      icon: 'fas fa-list'
    },
    {
      name: 'Bar Chart',
      href: 'bar_chart',
      icon: 'far fa-chart-bar'
    },
    {
      name: 'Cluster',
      href: 'cluster',
      icon: 'fas fa-spinner'
    },
    {
      name: 'Scatter',
      href: 'scatter',
      icon: 'far fa-chart-scatter'
    },
    // {
    //   name: 'Partition',
    //   href: '#',
    //   icon: 'fas fa-bullseye'
    // },
    // {
    //   name: 'Scatter',
    //   href: '#',
    //   icon: 'far fa-dot-circle'
    // },
    // {
    //   name: 'Talent Target',
    //   href: '#',
    //   icon: 'fas fa-chart-pie'
    // },
    // {
    //   name: 'Distribution',
    //   href: '#',
    //   icon: 'fas fa-chart-line'
    // },
    // {
    //   name: 'Word Cloud',
    //   href: '#',
    //   icon: 'fas fa-chart-area'
    // },
    {
      name: 'Word Cloud',
      href: 'word_cloud',
      icon: 'fas fa-cloud'
    }
  ]
  const disableLink = (link) => {
    return link.href === '#'
      ? 'opacity-50 text-gray-800 pointer-events-none cursor-not-allowed'
      : null
  }
  const activeLink = (link) => {
    return `/${link.href}` === pathname
      ? 'text-gray-100'
      : 'text-gray-700 hover:text-gray-200 focus:text-gray-200 box-shadow-hover box-shadow-focus'
  }

  return (
    <nav className="w-full">
      <ul className="flex pt-1">
        {linksList.map((link) => (
          <li key={link.name} className="pr-3">
            <Link className={`${disableLink(link)} ${activeLink(link)} `} to={`/${link.href}`}>
              <i className={link.icon} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

Links.propTypes = {}

export default Links
