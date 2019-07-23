const rp = require('request-promise');
require('dotenv').config()

export class GetPods {
	static APISERVER: any =  `${process.env.APISERVER}`;
	static TOKEN: string = `${process.env.AUTH_TOKEN}`;
	'NODE_TLS_REJECT_UNAUTHORIZED' = 0
	private static async callRestApi(method: string, url: string, headers?: any, body?: any) {
		try {
			const options: any = {
				method: method,
				uri: url,
				body: body,
				headers: headers,
				"rejectUnauthorized": false,
				json: true,
			};
			const result = await rp(options);
			return result;
		} catch (error) {
			throw error;
		}
	}
	
	public static async getPods() {
		let endpoint:any =`${GetPods.APISERVER}/api/v1/namespaces/default/pods/`;
		let header:any = {
				Authorization: `Bearer ${GetPods.TOKEN}` 
		};
		let result = await GetPods.callRestApi('GET',endpoint,header);
        return JSON.stringify(result['items']);
	}

	public static async getPodLogs(podname?:any){
		podname = 'api-qa-deployment-5ff7854c65-rj2g8';
		// /api/v1/namespaces/{namespace}/pods/{name}/log
		let endpoint:any =`${GetPods.APISERVER}/api/v1/namespaces/default/pods/${podname}/log`;
		let header:any = {
				Authorization: `Bearer ${GetPods.TOKEN}` 
		};
		let result = await GetPods.callRestApi('GET',endpoint,header);
		return JSON.stringify(result)
	}
	
	public static async invoker(){
		await GetPods.getPods();	
		await GetPods.getPodLogs();	
	}
}
GetPods.invoker();
export default GetPods;