import { BadgeDelta, Card, Divider, Flex, ProgressBar, Text } from "@tremor/react";
import Chart from "./../../components/chart/Chart"
import Header from './../../components/header/Header'
import CardMetric from "../../components/metric/CardMetric";
import { categories, chartdata } from "../../components/chart/fake_data"
import { useRouter } from "next/router"

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
      { params: { id: '4' } }
    ],
    fallback: false
  }
}

export const getStaticProps = (context) => {
  return {
    props: { categories }
  }
}

export default function Id(props) {

  const r = useRouter()
  // console.log(props.categories[0])
  // console.log(r.asPath)

  let index = undefined

  if (r.asPath === '/dashboard/1') {
    index = 0
  } else if (r.asPath === '/dashboard/2') {
    index = 1
  } else if (r.asPath === '/dashboard/3') {
    index = 2
  } else {
    index = 3

  }

  return <>
    <Header />
    <div className="pt-4" style={{ padding: '2rem' }}>
      <h1 className="text-4xl mb-6">{props.categories[index].metric}'s Phishing Statistics</h1>
      <Card>
        <BadgeDelta
          deltaType={props.categories[index].deltaType}
          size='xl'
          text={`${props.categories[index].delta} since last month`}
        />
        <Flex marginTop="mt-4">
          <Text>{props.categories[index].target}</Text>
        </Flex>
        <ProgressBar
          percentageValue={props.categories[index].percentageValue}
          target={props.categories[index].target}
        />
      </Card>
      <Divider />
      <Chart fakedata={chartdata} />
      <Divider />
      <CardMetric index={index} />
    </div>
  </>
}