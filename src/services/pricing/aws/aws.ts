import { PricingClient, GetProductsCommand } from "@aws-sdk/client-pricing"
import { EC2Client, DescribeSpotPriceHistoryCommand } from "@aws-sdk/client-ec2"

/**
 *
 * @param {string} instanceType - AWS instance type (e.g. m5.large)
 * @param {string} regionCode - region code (e.g. eu-west-1)
 * @param {string} marketOption - "spot" or "ondemand"
 * @returns
 */
export const PricePerHourAWS = (instanceType: string, regionCode: string, marketOption: string) => {
	if (marketOption === "standard") {
		return PricerPerHourOnDemand(instanceType, regionCode)
	} else if (marketOption === "spot") {
		return PricePerHourSpot(instanceType, regionCode)
	} else {
		console.log("unsupported pricing option")
		return null
	}
}
/**
 *
 * @param {string} availabilityZone Converts availability zone to region
 * @returns
 */
const azToRegion = (availabilityZone: string) => {
	const lastChar = availabilityZone.charAt(availabilityZone.length - 1)

	if (!isNaN(Number(lastChar))) {
		return availabilityZone
	}

	return availabilityZone.slice(0, -1)
}

const PricePerHourSpot = async (instanceType: string, availabilityZone: string) => {
	const region = azToRegion(availabilityZone)

	const ec2Client = new EC2Client({ region: region })

	const input = {
		ProductDescriptions: ["Linux/UNIX (Amazon VPC)"],
		InstanceTypes: [instanceType],
		MaxResults: Number(10),
		Filters: [
			{
				Name: "availability-zone",
				Values: [availabilityZone],
			},
		],
	}

	const command = new DescribeSpotPriceHistoryCommand(input)
	const response = await ec2Client.send(command)

	if (!response.SpotPriceHistory) {
		return null
	}

	if (response.SpotPriceHistory.length === 0) {
		return null
	}

	const prices = response.SpotPriceHistory.map((item) => Number(item.SpotPrice))
	const highestPriceUSD = Math.max(0, ...prices)
	return highestPriceUSD
}

const pricingClient = new PricingClient({ region: "us-east-1" })

const PricerPerHourOnDemand = async (instanceType: string, regionCode: string) => {
	const region = azToRegion(regionCode)

	const input = {
		ServiceCode: "AmazonEC2",
		Filters: [
			{
				Type: "TERM_MATCH",
				Field: "instanceType",
				Value: instanceType,
			},
			{
				Type: "TERM_MATCH",
				Field: "operatingSystem",
				Value: "Linux",
			},
			{
				Type: "TERM_MATCH",
				Field: "regionCode",
				Value: region,
			},
			{
				Type: "TERM_MATCH",
				Field: "marketOption",
				Value: "OnDemand",
			},
		],
		MaxResults: 10,
	}

	const command = new GetProductsCommand(input)
	const response = await pricingClient.send(command)

	if (!response.PriceList) {
		return null
	}

	if (response.PriceList.length === 0) {
		return null
	}

	const productList = response.PriceList.map((item) => JSON.parse(item as string))
	const prices = productList.map((data) => {
		try {
			return data.terms.OnDemand[Object.keys(data.terms.OnDemand)[0]].priceDimensions[
				Object.keys(data.terms.OnDemand[Object.keys(data.terms.OnDemand)[0]].priceDimensions)[0]
			].pricePerUnit.USD
		} catch (error) {
			return 0
		}
	})

	const highestPriceUSD = Math.max(0, ...prices)
	return highestPriceUSD
}
