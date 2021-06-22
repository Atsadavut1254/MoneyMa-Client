import { useLoading } from '@agney/react-loading';
import { Spin } from 'antd';

export function Load() {
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: (
            <Spin
                // className="loading"
                style={{
                    margin: '50%',
                    marginTop: '70%',
                    textAlign: 'center',
                    borderRadius: '4px'
                }}
            />
        )
    });

    return (
        <>
            <section {...containerProps}>{indicatorEl}</section>
        </>
    );
}
