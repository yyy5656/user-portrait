import { Button, Input, InputNumber, message } from "antd";
import styles from "@/styles/AddChar.module.scss";
import { useEffect, useMemo, useState } from "react";

export default function IntervalDataGroup(props) {
	const { numberScope, setCurScope, curScope, selectProperty, setGroupData } =
		props;
	const [scope, setScope] = useState({});
	const handleMinChange = (value) => {
		setCurScope((pre) => ({ ...pre, start: value }));
	};
	const handleMaxChage = (value) => {
		setCurScope((pre) => ({ ...pre, end: value }));
	};
	useEffect(() => {
		setScope({ min: numberScope.min, max: numberScope.max });
	}, [props.numberScope]);
	useEffect(() => {
		setGroupData((pre) => ({
			...pre,
			[selectProperty.linkId]: {
				...curScope,
				linkId: selectProperty.linkId,
				linkType: selectProperty.linkType,
			},
		}));
	}, [curScope]);

	return (
		<>
			{
				<div>
					<div>
						可选范围:{numberScope.min}~{numberScope.max}
					</div>
					{scope.min !== undefined && scope.max !== undefined && (
						<div>
							筛选条件: 最小值:
							<InputNumber
								name="min"
								min={numberScope.min}
								max={curScope.end || undefined}
								defaultValue={numberScope.min}
								onChange={handleMinChange}
							/>
							最大值:
							<InputNumber
								min={curScope.start}
								max={numberScope.max}
								defaultValue={numberScope.max || undefined}
								onChange={handleMaxChage}
							/>
						</div>
					)}
				</div>
			}
		</>
	);
}
